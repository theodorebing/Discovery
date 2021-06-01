export const ON_CHANGE_LINK = 'ON_CHANGE_LINK';

export const onChangeLink = (link) => ({
  type: ON_CHANGE_LINK,
  link,
});

export const OPEN_LINK_FORM = 'OPEN_LINK_FORM';

export const openLinkForm = (linkFormOpened) => ({
  type: OPEN_LINK_FORM,
  linkFormOpened,
});

export const CLOSE_LINK_FORM = 'CLOSE_LINK_FORM';

export const closeLinkForm = (linkFormOpened) => ({
  type: CLOSE_LINK_FORM,
  linkFormOpened,
});
