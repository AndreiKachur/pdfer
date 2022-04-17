export const TOOLBAR_OPTIONS = {
  options: [
    'inline',
    'blockType',
    'fontSize',
    'fontFamily',
    'list',
    'textAlign',
    'colorPicker',
    'link',
    'emoji',
    'image',
    'history',
  ],
  image: {
    previewImage: true,
    defaultSize: {
      height: 'auto',
      width: 650,
    },
  },
  inline: { inDropdown: true },
  list: { inDropdown: true },
  textAlign: { inDropdown: true },
  link: { inDropdown: true },
  history: { inDropdown: true },
};

export const PAGE_STYLE = `
@media print {
  @page { size: landscape; }
}

@page {
  size: 80mm 50mm;
}
`;

export const MESSAGE = {
  SAVED: 'Project was successfully saved locally.',
  EMPTY: "You don't have saved projects.",
};
