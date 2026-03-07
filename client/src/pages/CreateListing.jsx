import { useState } from 'react'
import { useListing } from '../hooks/useListing'
import { toast } from 'react-toastify'


const CreateListing = () => {
  const [listingValues, setListingValues] = useState({
    name: '',
    description: '',
    address: '',
    sellOrRent: 'rent',
    furnished: false,
    parkingSpot: false,
    offer: false,
    beds: 1,
    baths: 1,
    discountedPrice: 0,
    regularPrice: 0,
    images: []
  })
  const [filesName, setFilesName] = useState([])
  const listingMutation = useListing()
  const { isPending} = listingMutation
  const handleChange = (e,value) => {
    const {id} = e.target
    setListingValues({ ...listingValues, [id]: value })
   
  }
  const handleFormSubmit = (e) => {
    e.preventDefault()
    console.log({listingValues})
    if (!listingValues.name || !listingValues.address || !listingValues.regularPrice || listingValues.images.length === 0) {
      toast.error("Name, address, regular price and image are required")
      return
    }
    const formData = new FormData()
    e.preventDefault()
    Object.entries(listingValues).forEach(([key, value]) => {
     
      key !== "images" && formData.append(key, value)
    })
    listingValues.images.forEach((image) => {
      formData.append("images", image)
    })
   
  listingMutation.mutate(formData, {
    onSuccess: () => {
     toast.success("Listing created successfully")
     setListingValues({
      name: '',
      description: '',
      address: '',
      sellOrRent: 'rent',
      furnished: false,
      parkingSpot: false,
      offer: false,
      beds: 1,
      baths: 1,
      discountedPrice: 0,
      regularPrice: 0,
      images: []
     })
     setFilesName([])
    },
    onError: (error) => {
     
      toast.error("Error creating listing",error.message)
    }
  })
  }
  const handleImageSelect = (e) => {
    const file = e.target.files[0]
   if (listingValues.images.length >= 6) {
    toast.error("You can upload a maximum of 6 images")
    return
   }
    listingValues.images.push(file)
   
    const previewUrl = URL.createObjectURL(file)
    setFilesName((prev) =>[...prev,{  previewUrl }])
    
  
 
    // if (file) {
    //   setListingValues({ ...listingValues, images: file })
    // }
  }
  return (
    <div className='lg:mx-auto mx-8 max-w-4xl my-6'>
      <h1 className='font-bold text-3xl text-center'>Create a Listing</h1>
      <form
        onSubmit={handleFormSubmit}
        className='my-4 grid grid-cols-1 lg:grid-cols-2 gap-4'
      >
        <aside className='flex flex-col '>
          <input
            type='text'
            placeholder='Name'
            className={` border-[0.1px]
         border-gray-200 rounded-lg p-3 bg-white placeholder:text-gray-400`}
            id='name'
            onChange={(e) => handleChange(e, e.target.value)}
          />
          <textarea
            type='text'
            placeholder='Description'
            className={` border-[0.1px]
         border-gray-200 rounded-lg placeholder:text-gray-400 p-3 bg-white mt-4`}
            id='description'
            onChange={(e) => handleChange(e, e.target.value)}
          />
          <input
            type='text'
            placeholder='Address'
            className={` border-[0.1px]
         border-gray-200 placeholder:text-gray-400 rounded-lg p-3 bg-white mt-4`}
            id='address'
            onChange={(e) => handleChange(e, e.target.value)}
          />
          <div className='flex  gap-4 mt-4 items-center flex-wrap space-y-2'>
            <label className='flex items-center gap-3 text-lg'>
              <input
                className='w-5 h-5 cursor-pointer'
                type='checkbox'
                id='sellOrRent'
                checked={listingValues.sellOrRent === 'sell'}
                onChange={(e) => handleChange(e, 'sell')}
              />
              <p className=''>Sell</p>
            </label>

            <label className='flex items-center gap-3 text-lg'>
              <input
                className='w-5 h-5 cursor-pointer'
                type='checkbox'
                id='sellOrRent'
                checked={listingValues.sellOrRent === 'rent'}
                onChange={(e) => handleChange(e, 'rent')}
              />
              <p className=''>Rent</p>
            </label>
            <label className='flex items-center gap-3 text-lg'>
              <input
                className='w-5 h-5 cursor-pointer'
                type='checkbox'
                id='parkingSpot'
                checked={listingValues.parkingSpot}
                onChange={(e) => handleChange(e, !listingValues.parkingSpot)}
              />
              <p className=''>Parking Spot</p>
            </label>
            <label className='flex items-center gap-3 text-lg'>
              <input
                className='w-5 h-5 cursor-pointer'
                type='checkbox'
                id='furnished'
                checked={listingValues.furnished}
                onChange={(e) => handleChange(e, !listingValues.furnished)}
              />
              <p className=''>Furnished</p>
            </label>
            <label className='flex items-center gap-3 text-lg '>
              <input
                className='w-5 h-5 cursor-pointer'
                type='checkbox'
                id='offer'
                checked={listingValues.offer}
                onChange={(e) => handleChange(e, !listingValues.offer)}
              />
              <p className=''>Offer</p>
            </label>
          </div>
          <div className='my-4 flex gap-6 items-center'>
            <label className='flex items-center gap-3 text-lg '>
              <input
                className='w-18 text-md py-3 px-3  rounded-lg border-gray-300 border cursor-pointer bg-white'
                type='number'
                id='beds'
                min={0}
                value={listingValues.beds}
                onChange={(e) => handleChange(e, parseInt(e.target.value))}
              />
              <p className=''>Beds</p>
            </label>
            <label className='flex items-center gap-3 text-lg '>
              <input
                className='w-18 text-md py-3 px-3  rounded-lg border-gray-300 border cursor-pointer bg-white'
                type='number'
                id='baths'
                min={0}
                value={listingValues.baths}
                onChange={(e) => handleChange(e, parseInt(e.target.value))}
              />
              <p className=''>Baths</p>
            </label>
          </div>
          <div className='my-4 space-y-4'>
            <label className='flex items-center gap-3 text-lg '>
              <input
                className='w-32 text-md py-3 px-3  rounded-lg border-gray-300 border cursor-pointer bg-white'
                type='number'
                id='regularPrice'
                min={0}
                value={listingValues.regularPrice}
                onChange={(e) => handleChange(e, parseInt(e.target.value))}
              />
              <div className='flex flex-col '>
                <p className='text-md'>Regular price</p>
                {listingValues.sellOrRent === 'rent' && (
                  <p className='text-xs self-center'>($ / Month)</p>
                )}
              </div>
            </label>
            {listingValues.offer && (
              <label className='flex items-center gap-3 text-lg '>
                <input
                  className='w-32 text-md py-3 px-3  rounded-lg border-gray-300 border cursor-pointer bg-white'
                  type='number'
                  id='discountedPrice'
                  min={0}
                  value={listingValues.discountedPrice}
                  onChange={(e) => handleChange(e, parseInt(e.target.value))}
                />
                <div className='flex flex-col '>
                  <p className='text-md'>Discounted price</p>
                  {listingValues.sellOrRent === 'rent' && (
                    <p className='text-xs self-center'>($ / Month)</p>
                  )}
                </div>
              </label>
            )}
          </div>
        </aside>

        <aside>
          <h1 className='text-gray-700'>
            {' '}
            <span className='font-bold text-md text-black'>Images: </span>
            The first image will be the cover (max 6)
          </h1>
          <div className='mt-5  grid md:grid-cols-[70%_30%] grid-cols-1 justify-between gap-3 '>
            <div className='border-gray-300  border h-14  flex items-center p-3 gap-1.5 '>
              <label
                htmlFor='file'
                className='bg-gray-200 w-[50%] text-gray-700 py-1 px-2 border border-gray-500 hover:bg-gray-300 font-medium cursor-pointer'
              >
                Choose Files
              </label>

              <input
                onChange={handleImageSelect}
                type='file'
                name=''
                className='hidden'
                id='file'
              />

              { filesName.length === 0 && <h3>No file chosen</h3>}
            </div>
            <button className='text-green-600 p-3 cursor-pointer hover:shadow-md  border border-green-600 uppercase  '>
              Upload
            </button>
          </div>
         {filesName.length > 0 && <div className='flex flex-wrap gap-4 flex-row space-y-3 mt-4'>

          {filesName.map((file, index) => (
            <div key={index} className=' w-max h-max flex flex-col items-center'>
             
                <img
                  src={file.previewUrl}
                  className='w-15 h-15 object-cover'
                  alt=''
                  loading='lazy'
                />
                {/* <p className='truncate w-[60%]'>{file.name}</p> */}
            
            </div>
          ))}
          </div>}
          <button
            type='submit'
            disabled={isPending}
            className='bg-gray-700 text-white w-full mt-6 py-3 px-4 rounded-lg hover:bg-gray-600 cursor-pointer uppercase   h-max'
          >
            {isPending ? (
              <p className='animate-[breathe_1.5s_ease-in-out_infinite]'>
                Creating...
              </p>
            ) : (
              <p>Create Listing</p>
            )}
          </button>
        </aside>
      </form>
    </div>
  )
}

export default CreateListing
