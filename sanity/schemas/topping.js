import { FaPepperHot as Icon} from 'react-icons/fa'

export default {
  // computer name
  name: 'topping',
  // visible title
  title: 'Topping',
  type: 'document',
  icon: Icon,
  fields: [
    {
      name: 'name',
      title: 'Topping name',
      type: 'string',
      description: 'Name of the topping'
    },
    {
      name: 'vegetarian',
      title: 'Vegetarian',
      type: 'boolean',
      options: {
        layout: 'checkbox'
      }
    },
  ],
  preview: {
    select: {
      name: 'name',
      vegetarian: 'vegetarian'
    },
    prepare: ({name, vegetarian}) => ({
      title: `${name} ${vegetarian ? '🍀' : ''}`
    })
  }
}