import {
  EditorConfig,
  BlockQuote,
  Bold,
  Essentials,
  Heading,
  ImageInsert,
  ImageUpload,
  Italic,
  Link,
  List,
  SourceEditing,
  Table,
  TodoList,
  Underline,
  Undo,
  Strikethrough,
  Subscript,
  Superscript,
  RemoveFormat,
  CodeBlock,
  HorizontalLine,
  SpecialCharacters,
  FindAndReplace,
  Alignment,
  FontFamily,
  FontSize,
  FontColor,
  FontBackgroundColor
} from 'ckeditor5';

export const CKEditorConfig: EditorConfig = {
  licenseKey: 'GPL',
  toolbar: {
    items: [
      'undo', 'redo', 'findAndReplace',
      '|',
      'link',
      '|',
      'insertTable', 'horizontalLine', 'specialCharacters', 'sourceEditing',
      '|',
      'bold', 'italic', 'underline', 'strikethrough', 'subscript', 'superscript',
      '|',
      'removeFormat', 'blockQuote', 'codeBlock',
      '|',
      'alignment:left', 'alignment:center', 'alignment:right', 'alignment:justify',
      '|',
      'heading', 'fontFamily', 'fontSize',
      '|',
      'fontColor', 'fontBackgroundColor',
      '|',
      'numberedList', 'bulletedList', 'todoList',
       '|',
       /*'imageInsert',*/ 'imageUpload'
    ],
    shouldNotGroupWhenFull: false
  },
  plugins: [
    Essentials,
    Undo,
    Bold, Italic, Underline, Strikethrough, Subscript, Superscript,
    RemoveFormat, BlockQuote, CodeBlock,
    Link,
    ImageInsert, ImageUpload,
    Table, HorizontalLine,
    SpecialCharacters, SourceEditing,
    FindAndReplace,
    Alignment,
    Heading, FontFamily, FontSize, FontColor, FontBackgroundColor,
    List, TodoList
  ],
  heading: {
    options: [
      { model: 'paragraph', title: 'Paragraph', class: 'ck-heading_paragraph' },
      { model: 'heading1', view: 'h1', title: 'Heading 1', class: 'ck-heading_heading1' },
      { model: 'heading2', view: 'h2', title: 'Heading 2', class: 'ck-heading_heading2' },
      { model: 'heading3', view: 'h3', title: 'Heading 3', class: 'ck-heading_heading3' },
      { model: 'heading4', view: 'h4', title: 'Heading 4', class: 'ck-heading_heading4' },
      { model: 'heading5', view: 'h5', title: 'Heading 5', class: 'ck-heading_heading5' },
      { model: 'heading6', view: 'h6', title: 'Heading 6', class: 'ck-heading_heading6' }
    ]
  },
  htmlSupport: {
    allow: [
      {
        name: 'div',
        styles: true,
        attributes: true,
        classes: true
      },
      {
        name: /^.*$/,
        styles: true,
        attributes: true,
        classes: true
      }
    ]
  },
  link: {
    addTargetToExternalLinks: true,
    defaultProtocol: 'https://',
    decorators: {
      toggleDownloadable: {
        mode: 'manual',
        label: 'Downloadable',
        attributes: {
          download: 'file'
        }
      }
    }
  },
  list: {
    properties: {
      styles: true,
      startIndex: true,
      reversed: true
    }
  },
  table: {
    contentToolbar: [
      'tableColumn',
      'tableRow',
      'mergeTableCells',
      'tableProperties',
      'tableCellProperties'
    ]
  },
  placeholder: 'Write a comment...',
};