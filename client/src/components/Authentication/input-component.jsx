
import { ClipLoader } from 'react-spinners'
function InputForm({handleChange, handleSubmit, mutation, btnText}) {
  return (
    <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
      <input
        type='text'
        placeholder='Name'
              className={`${btnText === "sign in" && "hidden" } border-[0.1px]
         border-gray-200 rounded-lg p-3 bg-white`}
        id='name'
        onChange={handleChange}
      />
      <input
        type='text'
        placeholder='Email'
        className='border-[0.1px] border-gray-200 rounded-lg p-3 bg-white'
        id='email'
        onChange={handleChange}
      />
      <input
        type='text'
        placeholder='Password'
        className='border-[0.1px] border-gray-200 rounded-lg p-3 bg-white'
        id='password'
        onChange={handleChange}
      />
      {mutation.isError && <p className='text-red-500 text-sm'>{mutation.error.message}</p>}
      <button
        disabled={mutation.isPending}
        className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 cursor-pointer disabled:opacity-80 disabled:cursor-not-allowed'
      >
              {mutation.isPending ? <ClipLoader size={25} color='white' /> :  btnText}
      </button>
    </form>
  )
}

export default InputForm
