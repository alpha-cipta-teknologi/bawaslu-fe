import React, { useEffect, useState, useCallback } from 'react'
import { useSelector } from 'react-redux'
import { Editor } from 'react-draft-wysiwyg'
import { convertToRaw, EditorState } from 'draft-js'
import draftToHtml from 'draftjs-to-html'

import { Text, Card, Button, Input, AsyncSelect } from 'core/components'
import { hooks, toastify, utils } from 'utility'
import { actions } from 'store'

import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'

const formComplaintInputProps = [
  {
    label: 'Judul',
    name: 'title',
    placeholder: 'Mulai menulis',
    type: 'text'
  },
  {
    label: 'Kategori',
    name: 'jenis_aduan',
    type: 'async-select',
    placeholder: 'Pilih kategori'
  },
  {
    label: 'Deskripsi',
    name: 'description',
    type: 'editor'
  },
  {
    label: 'Link Berita',
    name: 'link_berita',
    placeholder: 'Link berita',
    type: 'text'
  },
  {
    label: 'Tujuan Aduan',
    name: 'regencies_id',
    type: 'async-select',
    placeholder: 'Pilih tujuan aduan'
  }
]

const initialSelect = {
  value: '',
  label: ''
}

const defaultCategories = [
  {
    value: 'Politisasi SARA',
    label: 'Politisasi SARA'
  },
  {
    value: 'Disinformasi',
    label: 'Disinformasi'
  },
  {
    value: 'Kampanye Hitam',
    label: 'Kampanye Hitam'
  },
  {
    value: 'Ujaran Kebencian',
    label: 'Ujaran Kebencian'
  }
]

const initStateSelect = {
  jenis_aduan: initialSelect,
  province_id: initialSelect,
  regencies_id: initialSelect
}

const initStateForm = {
  title: '',
  description: EditorState.createEmpty(),
  link_berita: ''
}

const FormComplaint = () => {
  // ** Store & Actions
  const lazyLoad = useSelector(state => state.misc).lazyLoad
  const allRegencies = useSelector(state => state.areas).allRegencies
  const complaintCategories = useSelector(state => state.params).complaintCategories

  const reportComplaint = hooks.useCustomDispatch(actions.complaint.reportComplaint)
  const getDataRegencies = hooks.useCustomDispatch(actions.areas.getDataRegencies)

  const [formComplaint, setFormComplaint] = useState(initStateForm)
  const [selectedSelect, setSelectedSelect] = useState(initStateSelect)

  const onSubmit = event => {
    event.preventDefault()

    const requestBody = {
      title: formComplaint.title,
      link_berita: formComplaint.link_berita,
      description: draftToHtml(convertToRaw(formComplaint.description.getCurrentContent())),
      province_id: {
        ...selectedSelect.province_id,
        value: +selectedSelect.province_id.value
      },
      regencies_id: {
        label: selectedSelect.regencies_id.label,
        value: +selectedSelect.regencies_id.value
      },
      jenis_aduan: selectedSelect.jenis_aduan.label
    }

    reportComplaint(requestBody, isSuccess => {
      if (isSuccess) {
        toastify.success('Terima kasih atas laporan Anda. Laporan Anda sudah dikirim ke admin Bawaslu dan akan segera ditindak lanjuti')

        setFormComplaint(initStateForm)
        setSelectedSelect(initStateSelect)
      }
    })
  }

  const onChangeForm = useCallback((keyName, value) => {
    setFormComplaint(prevForm => ({
      ...prevForm,
      [keyName]: value
    }))
  }, [])

  const onChangeSelect = useCallback((option, keyName) => {
    if (keyName === 'regencies_id') {
      setSelectedSelect(prevSelect => ({
        ...prevSelect,
        [keyName]: option,
        province_id: { value: option.area_province_id }
      }))
    } else {
      setSelectedSelect(prevSelect => ({
        ...prevSelect,
        [keyName]: option
      }))
    }
  }, [])

  const defaultOptions = (keyName) => {
    switch (keyName) {
      case 'jenis_aduan':
        return complaintCategories || defaultCategories
      case 'regencies_id':
        return allRegencies || []
      default:
        return []
    }
  }

  const loadingSelect = (keyName) => {
    switch (keyName) {
      case 'regencies_id':
        return utils.isLazyLoading(lazyLoad, 'getDataRegencies')
      case 'jenis_aduan':
        return utils.isLazyLoading(lazyLoad, 'getComplaintCategories')
      default:
        return false
    }
  }

  const promiseSelect = (inputValue, keyName) => {
    return new Promise((resolve) => {
      if (keyName === 'regencies_id') {
        getDataRegencies({
          page: 1,
          perPage: 30,
          q: inputValue
        }, data => {
          resolve(data || [])
        })
      } else {
        resolve(utils.filterSelectData(inputValue, defaultOptions(keyName)))
      }
    })
  }

  const renderButtonSubmit = () => {
    const disabled = utils.isEmptyForm({
      description: draftToHtml(convertToRaw(formComplaint.description.getCurrentContent())),
      regencies_id: selectedSelect.regencies_id.value,
      jenis_aduan: selectedSelect.jenis_aduan.value
    })
    const loading = utils.isLazyLoading(lazyLoad, 'createReportComplaint')

    return (
      <div className='w-full'>
        <Button.ButtonPrimary
          sizing='w-full'
          disabled={disabled}
          loading={loading}
          onClick={onSubmit}
        >Kirim Aduan</Button.ButtonPrimary>
      </div>
    )
  }

  const renderInput = (inputProps) => {
    const keyName = inputProps.name || ''
    const inputType = inputProps.type || 'text'

    if (inputType === 'async-select') {
      return (
        <AsyncSelect
          key={keyName}
          borderColor='border-grey-light-1'
          value={selectedSelect[keyName]}
          placeholder={inputProps.placeholder}
          onChange={value => onChangeSelect(value, keyName)}
          defaultOptions={defaultOptions(keyName)}
          loading={loadingSelect(keyName)}
          loadOptions={inputValue => promiseSelect(inputValue, keyName)}
        />
      )
    }

    if (inputType === 'editor') {
      return (
        <Editor
          editorState={formComplaint.description}
          toolbarClassName='border !border-grey-light-1 !rounded'
          wrapperClassName='mb-3'
          editorClassName='h-64 !p-1.5 border !border-grey-light-1 !rounded custom-scrollbar-secondary'
          onEditorStateChange={editorState => onChangeForm(keyName, editorState)}
          toolbar={{
            options: ['history', 'blockType', 'textAlign', 'colorPicker', 'fontSize', 'fontFamily', 'inline', 'list', 'link', 'emoji', 'image', 'remove'],
            inline: {
              inDropdown: false,
              options: ['bold', 'italic', 'underline', 'strikethrough']
            },
            textAlign: {
              inDropdown: true
            },
            list: {
              options: ['unordered', 'ordered']
            },
            link: {
              options: ['link']
            },
            fontFamily: {
              options: ['Montserrat']
            }
          }}
        />
      )
    }

    return (
      <Input
        borderColor='border-grey-light-1'
        key={keyName}
        id={keyName}
        value={formComplaint[keyName]}
        onChange={e => onChangeForm(keyName, e.target.value)}
        labelClassName='flex'
        placeholder={inputProps.placeholder}
        type={inputType}
      />
    )
  }

  return (
    <div className='max-w-2xl lg:max-w-4xl mx-auto flex flex-col gap-6 items-center'>
      <Text
        size='text-2.5xl'
        weight='font-bold'
        align='text-center'
      >Buat Pengaduan</Text>

      <Card
        paddingHorizontal='px-3'
        paddingVertical='py-3'
        cardClassName='w-full'
      >
        <div className='flex flex-col gap-3'>
          {formComplaintInputProps.map(inputProps => (
            <div key={inputProps.name} className='w-full'>
              <Text size='text-sm' spacing='mb-2.5'>{inputProps.label}</Text>

              {renderInput(inputProps)}
            </div>
          ))}
        </div>
      </Card>

      {renderButtonSubmit()}
    </div>
  )
}

export default FormComplaint
