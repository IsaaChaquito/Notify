import { useState } from "react"


const newVal = {
  'number': ( val ) => Number( val ),
  'string': ( val ) => val,
  'boolean': ( val ) => val === 'true'
}

const colors = {
  'number': 'text-red-400',
  'string': 'text-lime-300',
  'true': 'text-lime-500 italic',
  'false': 'text-red-600 italic'
}


/**
 * A custom select component that renders a select menu with options determined by the "options" prop.
 * The "type" prop determines the type of the value to be returned. The "state" and "updateState" props
 * are used to manage the state of the parent component.
 *
 * @param {{ attribute: string, options: string[], type: string, state: object, updateState: function }} props
 * @returns {JSX.Element}
 */
const CustomSelect = ({ attribute, options, type, state, updateState }) => {

  const [selectedValue, setSelectedValue] = useState(options[0])

  const handleUpdate = (e) => {
    const val = newVal[type](e.target.value) //convert string to respective type
        
    updateState( iterateObject({...state}, attribute, val) ) // recursively update state
    setSelectedValue(val)
  }

  function iterateObject(obj, attribute, val) {
    for (const key in obj) {
      if(key === attribute) {
        return {...obj, [key]: val}
      }
      if(obj[key] instanceof Object) {
        obj = {...obj, [key]: iterateObject(obj[key], attribute, val)}
      }
    }

    return obj
  }


  const getOptionColor = (option) => type === 'boolean' ? colors[newVal[type](option)] : colors[type]

  return (
    <div className='flex'>
      <span>{ attribute }:</span>
      <div className='SELECT-TYPE flex relative bg-black'>
        <select 
          className={`bg-black outline-none ${getOptionColor(selectedValue)}`}
          onChange={ (e) => handleUpdate(e) } 
          value={selectedValue}
        >
          {
            options.map(option => (
              <option 
                className={`${getOptionColor(option)} italic`} 
                key={option} 
                value={option}
              >
                {type === 'string' ? `${option},` : option + ','}
              </option>
            ))
          }
        </select>
      </div>
    </div>
  )
}

export default CustomSelect