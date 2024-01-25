import {useSelector} from 'react-redux'
import { useRef, useState, useEffect } from 'react';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from  'firebase/storage';
import { app } from '../firebase';

const Profile = () => {
    const fileRef = useRef(null)
    const [file, setFile]= useState(undefined);
    const [filepercent, setFilepercent] = useState(0);
    const {currentUser} = useSelector((state)=> state.user);
    const [fileUploadError, setFileUploadError] = useState(false);
    const [formData, setFormData] = useState({});
    console.log(formData)
    useEffect(() =>{
        if(file){
            handleFileUpload(file);
        }
    },[file]);

    const handleFileUpload =(file) =>{
        const storage = getStorage(app);
        const fileName = new Date().getTime() + file.name;
        const  storageRef = ref(storage,fileName);
        const uploadTask = uploadBytesResumable(storageRef,file);

        uploadTask.on('state_changed',(snapshot)=>{
            const progress= (snapshot.bytesTransferred/snapshot.totalBytes)*100;
            setFilepercent(Math.round(progress))
            
        },
        (error)=>{
            setFileUploadError(error);
        },
        ()=>{
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL)=>{
                setFormData({...formData,avatar:downloadURL});
            });
        })

    } 
    return (
        <div className='p-3 max-w-lg mx-auto' >
        <h1 className='text-3xl font-semibold text-center my-7'>Profile</h1>
        <form className='flex flex-col gap-4'>
            <input type="file" ref={fileRef} hidden accept='image/*' onChange={(e)=> setFile(e.target.files[0])} />
            <img onClick={()=>fileRef.current.click()} src={ formData.avatar || currentUser.avatar} alt="profile-pic"  className='rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-2'/>
            <p className='text-sm self-center'>
                {fileUploadError ?(
                    <span className='text-red-700'>Error Image Upload (image must be less than 2 mb )</span>
                ): filepercent > 0 && filepercent < 100 ? (
                    <span className='text-slate-800'>{`Uploading ${filepercent}%`}</span>
                ): filepercent ===100 ?(
                    <span className='text-green-700'>Image Successfully  uploaded!</span>
                ):('')}
            </p>
            <input type="text" placeholder={currentUser.username} className='border p-3  rounded-lg' id='username'/>
            <input type="email" placeholder={currentUser.email} className='border p-3  rounded-lg' id='email'/>
            <input type="password" placeholder='password' className='border p-3  rounded-lg' id='password'/>
            <button className='border p-3 bg-slate-700 text-white rounded-lg uppercase hover:opacity-90 disabled:opacity-80 '>Update</button>
        </form>

        <div className='flex justify-between m-5'>
            <span className='text-red-700 cursor-pointer'>Delete account</span>
            <span className='text-red-700 cursor-pointer'>Sign-out</span>
        </div>
        </div>
    );
}

export default Profile;
