import svgList from '../plugins/svgList'

export default {
  title: 'Images',
  argTypes: {
    svgTop: {
      control : { type: 'select', options: ['left', 'right', '']}
    },
    svgType: {
      control : { type: 'select', options: svgList}
    }
  }
}

const Template = args => ({
  props: {allArgs: { default: () => args }},
  template: `
    <JpImage style="max-width: 300px; margin: 50px auto 0" v-bind="allArgs"/>
  `
})

export const Paysage = Template.bind({})
export const Portrait = Template.bind({})

Paysage.args = {
  imgSrc: 'image:contentful/5zskGnqFMWao68ia86Ms4e/03a61290421c0a47d21d14e1570cb284/IMG_4791.jpg',
  rightGradient: 4,
  bottomGradient: 3,
}

Portrait.args = {
  ...Paysage.args,
  imgSrc: 'image:contentful/1CZ7UFrPsGe7Fv5DwcFPnO/ac42042a146c1ed37e8836ad3f65f350/24.JPG',
  rightGradient: 6,
  svgType: 'berceau'
}
