import { MdStore as Icon} from 'react-icons/md'

export default {
  // computer name
  name: 'storeSettings',
  // visible title
  title: 'Settings',
  type: 'document',
  icon: Icon,
  fields: [
    {
      name: 'name',
      title: 'Store name',
      type: 'string',
      description: 'Name of the store'
    },
    {
      name: 'slicemasters',
      title: 'Slicemasters currently slicing',
      type: 'array',
      of: [{type: 'reference', to: [{type:'person'}]}]
    },
    {
      name: 'hotSlices',
      title: 'Hot slices available in the case',
      type: 'array',
      of: [{type: 'reference', to: [{type:'pizza'}]}]
    }
  ],
}