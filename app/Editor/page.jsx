'use client'

import Color from '@tiptap/extension-color'
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Link from '@tiptap/extension-link'
import Image from '@tiptap/extension-image'
import TextAlign from '@tiptap/extension-text-align'
import Underline from '@tiptap/extension-underline';
import { useState } from 'react'
import { 
  Bold, Italic, Underline as UnderlineIcon, Link as LinkIcon, Image as ImageIcon, 
  List, ListOrdered, AlignLeft, AlignCenter, AlignRight, Save, Eye
} from 'lucide-react'
import { Button } from "../../@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../../components/ui/dialog"
import { Input } from "../../@/components/ui/input"
import { Label } from "../../@/components/ui/label"

export default function AdvancedRichTextEditor() {
  const [content, setContent] = useState('')
  const [showPreview, setShowPreview] = useState(true)
  const [linkUrl, setLinkUrl] = useState('')
  const [linkText, setLinkText] = useState('')
  const [showLinkDialog, setShowLinkDialog] = useState(false)

  const editor = useEditor({
    extensions: [
      StarterKit,
      Link.configure({
        openOnClick: false,
      }),
      Image,
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
      Underline, 
    ],
    content: '',
    onUpdate: ({ editor }) => {
      setContent(editor.getHTML());
    }
  });

  if (!editor) {
    return null
  }


  const addLink = () => {
    if (linkUrl && linkText) {
      editor.chain().focus().extendMarkRange('link').setLink({ href: linkUrl }).run()
      setShowLinkDialog(false)
      setLinkUrl('')
      setLinkText('')
    }
  }

  return (
    <div className="w-full max-w-4xl mx-auto p-4 bg-white shadow-lg rounded-lg">
      <div className="mb-4 flex flex-wrap gap-2">
        <Button
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={editor.isActive('bold') ? 'bg-primary-foreground' : ''}
        >
          <Bold className="w-4 h-4" />
        </Button>
        <Button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={editor.isActive('italic') ? 'bg-primary-foreground' : ''}
        >
          <Italic className="w-4 h-4" />
        </Button>
        <Button
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          className={editor.isActive('underline') ? 'bg-primary-foreground' : ''}
        >
          <UnderlineIcon className="w-4 h-4" />
        </Button>
        <Dialog open={showLinkDialog} onOpenChange={setShowLinkDialog}>
          <DialogTrigger asChild>
            <Button
              onClick={() => setShowLinkDialog(true)}
              className={editor.isActive('link') ? 'bg-primary-foreground' : ''}
            >
              <LinkIcon className="w-4 h-4" />
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>إضافة رابط</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="linkText" className="text-right">
                  نص الرابط
                </Label>
                <Input
                  id="linkText"
                  value={linkText}
                  onChange={(e) => setLinkText(e.target.value)}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="linkUrl" className="text-right">
                  عنوان URL
                </Label>
                <Input
                  id="linkUrl"
                  value={linkUrl}
                  onChange={(e) => setLinkUrl(e.target.value)}
                  className="col-span-3"
                />
              </div>
            </div>
            <Button onClick={addLink}>إضافة الرابط</Button>
          </DialogContent>
        </Dialog>
        <Button
          onClick={() => {
            const url = window.prompt('URL')
            if (url) {
              editor.chain().focus().setImage({ src: url }).run()
            }
          }}
        >
          <ImageIcon className="w-4 h-4" />
        </Button>
        <Button
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={editor.isActive('bulletList') ? 'bg-primary-foreground' : ''}
        >
          <List className="w-4 h-4" />
        </Button>
        <Button
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={editor.isActive('orderedList') ? 'bg-primary-foreground' : ''}
        >
          <ListOrdered className="w-4 h-4" />
        </Button>
        <Button
          onClick={() => editor.chain().focus().setTextAlign('left').run()}
          className={editor.isActive({ textAlign: 'left' }) ? 'bg-primary-foreground' : ''}
        >
          <AlignLeft className="w-4 h-4" />
        </Button>
        <Button
          onClick={() => editor.chain().focus().setTextAlign('center').run()}
          className={editor.isActive({ textAlign: 'center' }) ? 'bg-primary-foreground' : ''}
        >
          <AlignCenter className="w-4 h-4" />
        </Button>
        <Button
          onClick={() => editor.chain().focus().setTextAlign('right').run()}
          className={editor.isActive({ textAlign: 'right' }) ? 'bg-primary-foreground' : ''}
        >
          <AlignRight className="w-4 h-4" />
        </Button>
      </div>
      <style jsx global>{`
      .ProseMirror ul, .ProseMirror ol {
          padding-left: 1rem;
        }
        .ProseMirror li {
          margin-bottom: 0.25rem;
        }
        .preview ul, .preview ol {
          padding-left: 1rem;
        }
        .preview li {
          margin-bottom: 0.25rem;            
          line-height: 0.4cm;
        }
        `}
      </style>
      <EditorContent editor={editor} className="prose  text-black max-w-none p-4 border rounded-md min-h-[20px]" dir="auto" />
      {showPreview && (
        <div className='text-black prose mt-4 p-4 border rounded-md preview'>
          <h3 className="text-lg font-semibold mb-2">معاينة</h3>
          <div className='text-black break-all marker:text-black ' dangerouslySetInnerHTML={{ __html: content }} />
        </div>
      )}
    </div>
  )
}
