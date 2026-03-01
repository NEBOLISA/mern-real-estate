import { useState } from 'react'

import { useUpdateUser, useUser } from '../hooks/useUser'
import axios from 'axios'
import { useQueryClient } from '@tanstack/react-query'

import { useNavigate } from 'react-router-dom'
import ConfirmDialog from '../components/dialog/ConfirmDialog'
import { toast } from 'react-toastify'

function Profile() {
  const { data: userData } = useUser()
 
  const updateMutation = useUpdateUser()
  const { isPending } = updateMutation
  //const [isUploadingDone, setIsUploadingDone] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [updateForm, setUpdateForm] = useState({})
  const [photoFile, setPhotoFile] = useState(null)
  const [previewImage, setPreviewImage] = useState(null)
  const [openDialog, setOpenDialog] = useState(false)
const queryClient = useQueryClient()
  const preset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET
  const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME
  const navigate = useNavigate()
  const handleImageSelect = (e) => {
    const file = e.target.files[0]
    setPreviewImage(URL.createObjectURL(file))
    setPhotoFile(file)
  }
  const handleInputChange = (e) => {
    const { id, value } = e.target
    setUpdateForm({
      ...updateForm,
      [id]: value
    })
  }
  const displayMessage = (formFields) => {
    const filteredFields = Object.keys(formFields).filter(field => field !== "publicId")
    if (filteredFields.includes("password") && filteredFields.includes("email") && filteredFields.includes("name") && filteredFields.includes("avatar")) {
      return toast.success("Profile updated successfully")
    }
    // if(Object.keys(formFields).length === 0 && photoFile) {
    //   return toast.success("Avatar updated successfully")

    // }
    if (Object.keys(filteredFields).length === 1) {
      const fieldName = filteredFields[0].charAt(0).toUpperCase() + filteredFields[0].slice(1)
      return toast.success(`${fieldName} updated successfully`)
    }
    if (Object.keys(filteredFields).length > 1) {
        const capitalizedFields = filteredFields.map(field => field.charAt(0).toUpperCase() + field.slice(1))
        return toast.success(
          `${capitalizedFields.join(', ')} updated successfully`
        )
      }
  }
  const uploadImage = async () => {
    if (!photoFile) {
      return null
    }
    const cloudinaryData = new FormData()
    cloudinaryData.append('file', photoFile)
    cloudinaryData.append('upload_preset', preset)
    try {
      setIsUploading(true)
      const res = await axios.post(
        `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
        cloudinaryData,
        {
          onUploadProgress: (progressEvent) => {
            const progress = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            )
            setUploadProgress(progress)
          }
        }
      )
  
      return res.data
    } catch (error) {
      toast.error("Failed to upload image, please try again")
      console.log(error.message)
      throw error
    } finally {
      setIsUploading(false)
    }
  }
  
  const handleFormSubmit = async (e) => {
    e.preventDefault()
    try {
      let updateData = { ...updateForm }
      if (photoFile) {
        const res = await uploadImage()
     
        const { secure_url, public_id } = res
      
        updateData = {
          ...updateData,
          avatar: secure_url,
          publicId: public_id
        }
      }
      updateMutation.mutate(updateData, {
        onSuccess: async () => {
          if (photoFile) {

            setIsUploading(false)
           // setIsUploadingDone(true)
            setTimeout(() => {
            //  setIsUploadingDone(false)
              setUploadProgress(null)
            }, 2000)
          }
          
          // toast.success("Profile updated successfully")
          displayMessage(updateData)
          setPhotoFile(null)
          setUpdateForm({})
          setPreviewImage(null)
          
        }
      })
    } catch (error) {
      setIsUploading(false)
      toast.error(error.message || "Failed to update profile")
      console.log(error.message)
    }
  }
  //   const handleImage = (e) => {
  //     setIsUploading(true)
  //   const file = e.target.files[0]

  //   const formData = new FormData()
  //   formData.append('file', file)
  //     formData.append('upload_preset', preset)
  //     try {
  //       setIsUploading(true)

  //        uploadMutation.mutate(formData, {
  //          onSuccess: async (data) => {
  //            setIsUploading(false)
  //            setIsUploadingDone(true)
  //            setTimeout(() => {
  //              setIsUploadingDone(false)
  //            }, 2000)
  //            setUpdateForm({
  //              ...updateForm,
  //              avatar: data.secure_url,
  //              publicId: data.public_id
  //            })
  //            //   try {

  //            //         await axios.put("/api/users/me/avatar", {
  //            //       imageUrl: data.secure_url,
  //            //           publicId: data.public_id

  //            //         })

  //            //         setIsUploadingDone(true)
  //            //           setIsUploading(false)
  //            //       setTimeout(() => {
  //            //         setIsUploadingDone(false)
  //            //       }, 2000);
  //            // } catch (error) {
  //            //   console.log(error.message)
  //            //   } finally {
  //            //     setIsUploading(false)
  //            //   }

  //            //   queryClient.invalidateQueries(["user"]).finally(() => {
  //            //     setIsUploading(false)

  //            // });
  //          }
  //        })
  //     }catch (error) {
  //       console.log(error.message)
  //     }

  // }
  const handleDialogOpen =  () => { 
    setOpenDialog(true)
  }
  const handleSignOut = async () => { 
    try {
    await axios.post('/api/auth/logout', {}, { withCredentials: true })
      
      queryClient.setQueryData(['user'], null)
     
      navigate('/sign-in')
    } catch (error) {
      toast.error("Failed to sign out")
      console.log(error.message)
    }
  }
 
  return (
    <div className=' max-w-md m-auto'>
      <h1 className='text-3xl font-semibold my-8 text-black text-center'>
        Profile
      </h1>
      <div className='w-max mx-auto relative'>
        {isUploading && (
          <div className='absolute inset-0 rounded-full '>
            <div className='absolute inset-0 bg-black opacity-50 rounded-full flex items-center justify-center text-white text-sm font-medium transition-opacity duration-300 pointer-events-none z-10'></div>
            <span className='absolute inset-0 flex items-center justify-center text-white text-sm font-medium z-20 animate-[breathe_1.5s_ease-in-out_infinite]'>
              Uploading...
            </span>
          </div>
        )}
        <input
          accept='image/*'
          type='file'
          id='photo'
          hidden
          onChange={handleImageSelect}
        />
        <label htmlFor='photo'>
          <img
            src={
              previewImage ||
              userData?.user.avatar ||
              'https://www.shutterstock.com/image-vector/user-profile-icon-vector-avatar-600nw-2558760599.jpg'
            }
            alt='Profile Avatar'
            className='w-24 h-24 cursor-pointer rounded-full object-cover  mx-auto'
          />
        </label>
      </div>
      <h2 className='text-center text-green-600 my-3 text-sm'>
        {uploadProgress > 0 && `${uploadProgress}%`}
      </h2>
      
      <form onSubmit={handleFormSubmit} className='w-full'>
        <input
          type='text'
          placeholder='Name'
          className={` border-[0.1px]
         border-gray-200 rounded-lg p-3 bg-white w-full mt-5`}
          id='name'
          value={updateForm.name || userData?.user.name}
          onChange={handleInputChange}
        />
        <input
          type='text'
          placeholder='Add Email'
          className={` border-[0.1px]
         border-gray-200 rounded-lg p-3 bg-white w-full mt-5 ${userData?.user.provider !== 'local' && 'opacity-50 cursor-not-allowed'}`}
          id='email'
          value={updateForm.email || userData?.user.email}
          onChange={handleInputChange}
          disabled={userData?.user.provider !== 'local'}
          readOnly={userData?.user.provider !== 'local'}
        />
        {userData?.user.provider === 'local' && (
          <input
            type='text'
            placeholder='Change Password'
            className={` border-[0.1px]
         border-gray-200 rounded-lg p-3 bg-white w-full mt-5`}
            id='password'
            onChange={handleInputChange}
          />
        )}
        <button
          type='submit'
          className='bg-slate-700 w-full mt-5 cursor-pointer text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'
        >
          {isUploading || isPending ? (
            <span className='animate-[breathe_1.5s_ease-in-out_infinite]'>
              Updating...
            </span>
          ) : (
            'Update Profile'
          )}
        </button>
        <button
          type='button'
          className='bg-green-700 w-full mt-3 cursor-pointer text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'
        >
          create listing
        </button>
      </form>
      <div className='flex  justify-between w-full mt-5'>
        <button
          type='button'
          className=' w-max cursor-pointer  text-red-800  hover:text-red-700'
        >
          Delete Account
        </button>
        <button
          type='button'
          onClick={handleDialogOpen}
          className=' w-max cursor-pointer  text-red-800   hover:text-red-700'
        >
          Sign Out
        </button>
      </div>
      <button
        type='button'
        className='w-full cursor-pointer mt-3 text-green-700 hover:text-green-600 text-center'
      >
        Show Listings
      </button>
      <ConfirmDialog
        open={openDialog}
        handleClose={() => setOpenDialog(false)}
        confirmAction={handleSignOut}
      />
    </div>
  )
}

export default Profile
