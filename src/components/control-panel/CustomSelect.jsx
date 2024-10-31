

/**
 * A custom select component that renders a select menu with options determined by the "options" prop.
 * The "type" prop determines the type of the value to be returned. The "state" and "updateState" props
 * are used to manage the state of the parent component.
 *
 * @param {{ attribute: string, options: string[], type: string, state: object, updateState: function }} props
 * @returns {JSX.Element}
 */
const CustomSelect = ({ attribute, options, type, state, updateState }) => {


  const handleUpdate = (e) => {
    
    const value = e.target.value
    const newVal = {
      'number': Number( value ),
      'string': value,
      'boolean': value === 'true'
    }

    updateState( iterateObject({...state}, attribute, newVal) )
  }

  function iterateObject(obj, attribute, newVal) {
    for (const key in obj) {
      if(key === attribute) {
        obj[key] = newVal[type]
        return {...obj}
      }
      if(obj[key] instanceof Object) {
        return {...obj, [key]: iterateObject(obj[key], attribute, newVal)}
      }
    }
  }

  return (
    <div className='flex'>
      <span>{ attribute }:</span>
      <div className='SELECT-TYPE flex relative bg-black'>
        <select 
          className='bg-black outline-none'
          onChange={ (e) => handleUpdate(e) } 
          defaultValue={state.type + ':'} 
        >
          {options.map(type => <option key={type} value={type}>{type}</option>)}
        </select>
      </div>
    </div>
  )
}

export default CustomSelect