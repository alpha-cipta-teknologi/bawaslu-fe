import React, { useState, useEffect, useCallback } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'

import { Text, Card, Button, Input, AsyncSelect, UploadFile } from 'core/components'
import { Editor } from 'react-draft-wysiwyg'
import draftToHtml from 'draftjs-to-html'
import { convertToRaw, EditorState } from 'draft-js'
import { hooks, toastify, utils } from 'utility'
import { actions } from 'store'

import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'

const formThreadInputProps = [
  {
    label: 'Judul',
    name: 'title',
    placeholder: 'Mulai menulis',
    type: 'text'
  },
  {
    label: 'Tema',
    name: 'tema_id',
    type: 'async-select',
    placeholder: 'Pilih tema'
  },
  {
    label: 'Deskripsi',
    name: 'description',
    type: 'editor'
  },
  {
    label: 'Lampiran Gambar',
    name: 'image',
    type: 'file-dropzone'
  }
]

const formCommunityInputProps = {
  label: 'Komunitas',
  name: 'komunitas_id',
  type: 'async-select',
  placeholder: 'Pilih komunitas'
}

const initialSelect = {
  value: '',
  label: ''
}

const ForumSavePage = () => {

  const history = useHistory()
  const location = useLocation()
  const { userdata } = utils.isUserLoggedIn() ? utils.getUserData() : { userdata: null }

  // ** Store & Actions
  const lazyLoad = useSelector(state => state.misc).lazyLoad
  const allCommunities = useSelector(state => state.communities)?.allCommunities
  const allTopics = useSelector(state => state.topics)?.allTopics

  const createForumArticle = hooks.useCustomDispatch(actions.forums.createForumArticle)
  const getAllDataCommunity = hooks.useCustomDispatch(actions.communities.getAllDataCommunity)
  const getAllDataTopic = hooks.useCustomDispatch(actions.topics.getAllDataTopic)

  const [formThread, setFormThread] = useState({
    title: '',
    description: EditorState.createEmpty(),
    komunitas_id: initialSelect,
    tema_id: initialSelect
  })
  const [selectedSelect, setSelectedSelect] = useState({
    komunitas_id: initialSelect,
    tema_id: initialSelect
  })
  const [showErrorInput, setShowErrorInput] = useState(false)
  const [file, setFile] = useState(null)
  const [fileUrl, setFileUrl] = useState(null)

  useEffect(() => {
    if (!userdata) {
      history.push('/login')
      return
    }

    getAllDataCommunity(data => {
      const channelIdRouteState = location?.state?.channelId
      if (channelIdRouteState) {
        const findCommunity = data?.find(community => +community.value === +channelIdRouteState)

        if (findCommunity) {
          setSelectedSelect(prev => ({
            ...prev,
            komunitas_id: {
              label: findCommunity?.label,
              value: findCommunity?.value
            }
          }))
        }
      }

    })
    getAllDataTopic()
  }, [])

  const onSubmit = event => {
    event.preventDefault()

    const isFormThreadError = utils.isFormError(formThreadInputProps, formThread)

    if (isFormThreadError) {
      setShowErrorInput(true)
    } else {
      setShowErrorInput(false)

      const requestBody = {
        title: formThread.title,
        description: draftToHtml(convertToRaw(formThread.description.getCurrentContent())),
        status: 1,
        image: file ? file : '',
        komunitas_id: JSON.stringify({
          ...selectedSelect.komunitas_id,
          value: +selectedSelect.komunitas_id.value
        }),
        tema_id: JSON.stringify({
          ...selectedSelect.tema_id,
          value: +selectedSelect.tema_id.value
        })
      }

      createForumArticle(requestBody, isSuccess => {
        if (isSuccess) {
          toastify.success('Berhasil memposting')

          if (selectedSelect.komunitas_id.value) {
            history.push(`/forum/channel/${selectedSelect.komunitas_id.value}`)
          } else {
            history.push(`/forum/channel/${allCommunities[0].value}`)
          }
        }
      })
    }
  }

  const setUploadDocument = (fileList) => {
    const files = fileList || []
    const reader = new FileReader()

    if (files.length <= 0) return

    reader.onload = () => {
      const blobURL = URL.createObjectURL(files[0])

      setFile(files[0])

      setFileUrl(blobURL)
    }

    reader.readAsDataURL(files[0])
  }

  const onChangeUploadFile = useCallback(async event => {
    try {
      setUploadDocument(event.target.files)
    } catch (error) {
      toastify.error('Terjadi kesalahan saat mengupload')
    }
  }, [])

  const onDropUploadFile = useCallback(async event => {
    try {
      setUploadDocument(event.dataTransfer.files)
    } catch (error) {
      toastify.error('Terjadi kesalahan saat mengupload')
    }
  }, [])

  const onChangeForm = useCallback((keyName, value) => {
    setFormThread(prevForm => ({
      ...prevForm,
      [keyName]: value
    }))
  }, [])

  const onChangeSelect = useCallback((option, keyName) => {
    setSelectedSelect(prevSelect => ({
      ...prevSelect,
      [keyName]: option
    }))
  }, [])

  const defaultOptions = (keyName) => {
    switch (keyName) {
      case 'tema_id':
        return allTopics || []
      case 'komunitas_id':
        return allCommunities || []
      default:
        return []
    }
  }

  const loadingSelect = (keyName) => {
    switch (keyName) {
      case 'tema_id':
        return utils.isLazyLoading(lazyLoad, 'getAllDataTopic')
      case 'komunitas_id':
        return utils.isLazyLoading(lazyLoad, 'getAllDataCommunity')
    }
  }

  const promiseSelect = (inputValue, keyName) => {
    return new Promise((resolve) => {
      resolve(utils.filterSelectData(inputValue, defaultOptions(keyName)))
    })
  }

  const onClickRemoveDocument = () => {
    setFile(null)
    setFileUrl('')
  }

  const renderChoosenFile = () => {
    return (
      <UploadFile
        fileName={file.name}
        url={fileUrl}
        onRemove={onClickRemoveDocument}
      />
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
          editorState={formThread.description}
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
            }
          }}
        />
      )
    }

    if (inputType === 'file-dropzone') {
      return (
        <>
          {file && fileUrl
            ? renderChoosenFile()
            : (
              <Input
                type='file-dropzone'
                bgColor='bg-grey-lighter-2'
                borderColor='border-grey-light-1'
                value={file}
                onChangeFile={onChangeUploadFile}
                onDropFile={onDropUploadFile}
                acceptFile='image/*'
              />
            )}
        </>
      )
    }

    return (
      <Input
        borderColor='border-grey-light-1'
        key={keyName}
        id={keyName}
        value={formThread[keyName]}
        onChange={e => onChangeForm(keyName, e.target.value)}
        labelClassName='flex'
        showError={showErrorInput}
        setShowError={setShowErrorInput}
        placeholder={inputProps.placeholder}
        type={inputType}
      />
    )
  }

  const renderCardCommunityForm = () => {
    const disabled = utils.isEmptyForm({
      ...formThread,
      description: draftToHtml(convertToRaw(formThread.description.getCurrentContent())),
      komunitas_id: selectedSelect.komunitas_id.value,
      tema_id: selectedSelect.tema_id.value
    })
    const loading = utils.isLazyLoading(lazyLoad, 'createForumArticle')

    return (
      <Card paddingHorizontal='px-3' paddingVertical='py-3'>
        <div className='flex flex-col gap-3'>
          <Text weight='font-bold'>{formCommunityInputProps.label}</Text>

          {renderInput(formCommunityInputProps)}

          <Button.ButtonPrimary
            spacing='py-2.5 px-5'
            fontSize='text-base'
            sizing='w-full'
            disabled={disabled}
            loading={loading}
            onClick={onSubmit}
          >
            Posting
          </Button.ButtonPrimary>
        </div>
      </Card>
    )
  }

  // const renderCardForm = () => {
  //   return (
  //     <Card paddingHorizontal='px-3' paddingVertical='py-3'>
  //       <Text size='text-sm' className='mb-2'>Title</Text>
  //       <Input
  //         containerClassName='mb-3'
  //         borderColor='border-grey-light-1'
  //         key={'title'}
  //         id={'title'}
  //         placeholder='Mulai menulis'
  //         onChange={(e) => setTitle(e.target.value)}
  //       />
  //       <Text size='text-sm' className='mb-2'>Deskripsi</Text>
  //       <Editor
  //         editorState={desc}
  //         toolbarClassName='border border-solid border-[#E0E0E0]'
  //         wrapperClassName='mb-3'
  //         editorClassName='h-64 mb-2 border border-solid border-[#E0E0E0]'
  //         onEditorStateChange={setDesc}
  //         toolbar={{
  //           options: ['history', 'blockType', 'textAlign', 'colorPicker', 'fontSize', 'fontFamily', 'inline', 'list', 'link', 'emoji', 'image', 'remove'],
  //           inline: {
  //             inDropdown: false,
  //             options: ['bold', 'italic', 'underline', 'strikethrough']
  //           },
  //           textAlign: {
  //             inDropdown: true
  //           },
  //           list: {
  //             options: ['unordered', 'ordered']
  //           },
  //           link: {
  //             options: ['link']
  //           }
  //         }}
  //       />
  //       <Text size='text-sm' className='mb-2'>Lampiran Gambar/Vidio</Text>
  //       <div className='w-full'>
  //         <label className='flex justify-center w-full h-32 px-4 transition bg-white border-2 border-gray-300 border-dashed rounded-md appearance-none cursor-pointer hover:border-gray-400 focus:outline-none'>
  //           {upload.link ? (
  //             <img
  //               className='h-full'
  //               src={upload.link}
  //               alt={''}
  //             />
  //           ) : (
  //             <>
  //               <span className='flex flex-col justify-center items-center space-x-2'>
  //                 <CloudArrowUpIcon className='w-5 h-5 fill-white stroke-black-default' />
  //                 <span className='font-medium text-gray-600'>
  //                   Drag gambar, atau
  //                   <span className='text-blue-600 underline ml-1'>browse</span>
  //                 </span>
  //               </span>
  //               <input type='file' name='file_upload' onChange={onChangeFile} className='hidden' accept='image/*' />
  //             </>
  //           )}
  //         </label>
  //       </div>

  //     </Card>
  //   )
  // }

  const renderCardForm = () => {
    return (
      <Card paddingHorizontal='px-3' paddingVertical='py-3'>
        <div className='grid gap-y-3 w-full'>
          {formThreadInputProps.map(inputProps => (
            <div key={inputProps.name} className='w-full'>
              <Text size='text-sm' spacing='mb-2.5'>{inputProps.label}</Text>

              {renderInput(inputProps)}
            </div>
          ))}
        </div>
      </Card>
    )
  }

  return (
    <div className='py-3 md:py-6'>
      <Text weight='font-bold' size='text-2xl'>Buat Post</Text>

      <div className='mt-3 grid md:grid-cols-12 gap-7 lg:gap-12'>
        <div className='flex flex-col w-full md:col-span-7'>
          {renderCardForm()}
        </div>

        <div className='w-full md:flex-1 md:col-span-5'>
          {renderCardCommunityForm()}
        </div>
      </div>
    </div>
  )
}

export default ForumSavePage