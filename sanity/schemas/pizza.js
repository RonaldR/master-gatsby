import { MdLocalPizza as Icon} from 'react-icons/md'
import PriceInput from '../components/PriceInput'

export default {
  // computer name
  name: 'pizza',
  // visible title
  title: 'Pizzas',
  type: 'document',
  icon: Icon,
  fields: [
    {
      name: 'name',
      title: 'Pizza name',
      type: 'string',
      description: 'Name of the pizza'
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
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true
      }
    },
    {
      name: 'price',
      title: 'Price',
      type: 'number',
      description: 'Price of the pizza',
      validation: Rule => Rule.min(1000).max(50000),
      inputComponent: PriceInput
    },
    {
      name: 'toppings',
      title: 'Toppings',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'topping'}]}]
    }
  ],
  preview: {
    select: {
      name: 'name',
      image: 'image',
      topping0: 'toppings.0.name',
      topping1: 'toppings.1.name',
      topping2: 'toppings.2.name',
      topping3: 'toppings.3.name',
    },
    prepare: ({name, image, ...toppings}) => {
      return {
        title: name,
        media: image,
        subtitle: Object.values(toppings).filter(Boolean).join(', ')
      }
    }
  }
}