import { MdPerson as Icon} from 'react-icons/md'

export default {
  // computer name
  name: 'person',
  // visible title
  title: 'Slicemasters',
  type: 'document',
  icon: Icon,
  fields: [
    {
      name: 'name',
      title: 'Person name',
      type: 'string',
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 100
      }
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
    },
    {
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true
      }
    },
  ],
}