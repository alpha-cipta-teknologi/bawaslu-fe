import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'

import { Text, Card, Button, Input, Select } from 'core/components'
import { Editor } from "react-draft-wysiwyg"
import draftToHtml from 'draftjs-to-html'
import { convertToRaw } from 'draft-js'
import { hooks, toastify, utils } from 'utility'
import { actions } from 'store'

import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css"
import { CloudArrowUpIcon } from '@heroicons/react/24/solid'

const ForumSavePage = () => {

  const history = useHistory()
  const { userdata } = utils.isUserLoggedIn() ? utils.getUserData() : { userdata: null }

  // ** Store & Actions
  const createForumArticle = hooks.useCustomDispatch(actions.forums.createForumArticle)
  const getAllDataCategory = hooks.useCustomDispatch(actions.forums.getAllDataCategory)

  const [title, setTitle] = useState('')
  const [desc, setDesc] = useState('')
  const [category, setCategory] = useState([])
  const [selectedCategory, setSelectedCategory] = useState(null)
  const [logo, setLogo] = useState({ file: null, link: null })

  useEffect(() => {
    if (!userdata) {
      history.push('/login')
      return
    }

    getAllDataCategory({

    }, async data => {
      setCategory(data.map(d => {
        return {
          label: d.category_name,
          value: d.id
        }
      }))
    })
  }, [])

  const onSubmit = () => {

    if (title === '') {
      toastify.error('Title wajib diisi')
    } else if (desc === '') {
      toastify.error('Deskripsi wajib diisi')
    } else {
      const datas = new FormData
      datas.category_name = selectedCategory?.label
      datas.title = title
      datas.description = draftToHtml(convertToRaw(desc.getCurrentContent()))
      datas.status = 1
      datas.image = logo.file ? logo.file : ''

      createForumArticle(datas, isSuccess => {
        if (isSuccess) {
          toastify.success(`Berhasil memposting`)

          history.push('/forum')
        }
      })
    }
  }

  const onChangeFile = e => {

    const reader = new FileReader(),
      files = e.target.files

    if (files.length <= 0) return

    reader.onload = function () {
      const blobURL = URL.createObjectURL(files[0])
      setLogo({ file: files[0], link: blobURL })
    }
    reader.readAsDataURL(files[0])
  }

  return (
    <div className='py-3 md:py-6'>
      <Text weight='font-bold' size='text-2xl'>Buat Post</Text>
      <div className='flex flex-col w-full md:flex-row'>
        <div className='flex flex-col w-full md:flex-auto md:w-80'>
          <Card cardClassName='md:mr-7 mb-2 md:mb-0'>
            <Text size='text-sm' className='mb-2'>Title</Text>
            <Input
              containerClassName='mb-3'
              borderColor='border-grey-light-1'
              key={'title'}
              id={'title'}
              placeholder='Mulai menulis'
              onChange={(e) => setTitle(e.target.value)}
            />
            <Text size='text-sm' className='mb-2'>Deskripsi</Text>
            <Editor
              editorState={desc}
              toolbarClassName="border border-solid border-[#E0E0E0]"
              wrapperClassName="mb-3"
              editorClassName="h-64 mb-2 border border-solid border-[#E0E0E0]"
              onEditorStateChange={setDesc}
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
            <Text size='text-sm' className='mb-2'>Lampiran Gambar/Vidio</Text>
            <div className="w-full">
              <label className="flex justify-center w-full h-32 px-4 transition bg-white border-2 border-gray-300 border-dashed rounded-md appearance-none cursor-pointer hover:border-gray-400 focus:outline-none">
                {logo.link ? (
                  <img
                    className='h-full'
                    src={logo.link}
                    alt={''}
                  />
                ) : (
                  <>
                    <span className="flex flex-col justify-center items-center space-x-2">
                      <CloudArrowUpIcon className='w-5 h-5 fill-white stroke-black-default' />
                      <span className="font-medium text-gray-600">
                        Drag gambar, atau
                        <span className="text-blue-600 underline ml-1">browse</span>
                      </span>
                    </span>
                    <input type="file" name="file_upload" onChange={onChangeFile} className="hidden" accept='image/*' />
                  </>
                )}
              </label>
            </div>

          </Card>
        </div>
        <div className='w-full md:flex-1 md:w-90'>
          <Card cardClassName='md:ml-7'>
            <Text weight='font-bold'>Pilih Kategori</Text>
            <Select placeholder='Pilih Kategori' wrapperClassName='mb-3' list={category} onChange={(e) => setSelectedCategory(e)} value={selectedCategory} />
            <Button.ButtonPrimary
              href='/forum/create'
              spacing='py-2.5 px-5'
              fontSize='text-base'
              sizing='w-full'
              onClick={onSubmit}
            >
              Posting
            </Button.ButtonPrimary>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default ForumSavePage