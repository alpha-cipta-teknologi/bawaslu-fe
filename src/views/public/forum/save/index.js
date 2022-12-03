import React, { useState } from 'react'

import { Text, Card, Button, Input, Select } from 'core/components'
import { Editor } from "react-draft-wysiwyg"

import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css"
import { CloudArrowUpIcon } from '@heroicons/react/24/solid'

const ForumSavePage = () => {

  const [desc, setDesc] = useState('')

  return (
    <div className='py-3 md:py-6'>
      <Text weight='font-bold' size='text-2xl'>Buat Post</Text>
      <div className='flex flex-col w-full md:flex-row'>
        <div className='flex flex-col w-full md:flex-auto md:w-80'>
          <Card cardClassName='mr-7'>
            <Text size='text-sm' className='mb-2'>Tittle</Text>
            <Input
              containerClassName='mb-3 border border-solid border-[#E0E0E0]'
              key={'title'}
              id={'title'}
              placeholder='Mulai menulis'
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
            <div className='flex flex-col justify-center items-center border border-solid border-[#E0E0E0] w-full h-20 bg-[#E0E0E0]'>
              <CloudArrowUpIcon className='w-5 h-5 fill-white stroke-black-default'/>
              <Text size='text-sm'>Drag gambar atau vidio mu kesini</Text>
            </div>
          </Card>
        </div>
        <div className='w-full md:flex-1 md:w-90'>
          <Card cardClassName='ml-7'>
            <Text weight='font-bold'>Pilih Kategori</Text>
            <Select placeholder='Pilih Kategori' wrapperClassName='mb-3'/>
            <Button.ButtonPrimary
              href='/forum/create'
              spacing='py-2.5 px-5'
              fontSize='text-base'
              sizing='w-full'
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