"use client";
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';
//import { updateSiteImages } from '@/lib/actions/siteImages.event';

export default function ImagesChangerForm({ siteImages, newHomeFromOld }) {
  const initialValues = { ...siteImages, homeImg: '' }; // Imposta homeImg vuoto se vuoi mostrare il placeholder

  const [currentHomeImg, setCurrentHomeImg] = useState(siteImages.homeImg);
  const [imgPreview, setImgPreview] = useState(currentHomeImg);
  const router = useRouter();
  const currentId = siteImages._id

  useEffect(() => {
    if (newHomeFromOld) {
      setImgPreview(newHomeFromOld);
      setValue('homeImg', newHomeFromOld);
      handleSubmit(doSubmit)();
    }
  }, [newHomeFromOld])

  const { register, handleSubmit, setValue, formState: { errors } } = useForm({
    defaultValues: initialValues,
  });

  const doSubmit = async (values) => {
    /* const newHomeImg = values.homeImg;
    const updatedOldHomeImgs = siteImages.oldHomeImgs || [];

    if (!updatedOldHomeImgs.includes(currentHomeImg)) {
      updatedOldHomeImgs.push(currentHomeImg);  // Aggiungi solo se non è già presente
    }
  
    try {
      const updatedEvent = await updateSiteImages({
        newSiteImages: { 
          _id: currentId,  // Cambia 'id' in '_id'
          ...values, 
          homeImg: newHomeImg, 
          oldHomeImgs: updatedOldHomeImgs 
        },
        path: `/`,
      });
  
      if (updatedEvent) {
        toast.success('Immagine homepage aggiornata');
        setCurrentHomeImg(''); 
        router.refresh()
      }
    } catch (error) {
      toast.error('Aggiornamento immagine homepage non riuscito!');
      console.log(error);
    } */
  };
  

  const handleImageChange = (e) => {
    const newImageUrl = e.target.value;
    setImgPreview(newImageUrl); // Aggiorna l'anteprima dell'immagine
    setValue('homeImg', newImageUrl); // Aggiorna il valore nel form gestito da react-hook-form
  };

  return (
    <>
      {imgPreview && (
        <>
        <p>Immagine attuale</p>
        <img 
          src={imgPreview} 
          alt="Anteprima immagine" 
          style={{ maxWidth: '300px', height: 'auto' }} 
        />
        </>
      )}
      <form onSubmit={handleSubmit(doSubmit)} className='img-changer-form'>
        <div className='form-control img-uploader'>
          <label htmlFor='homeImg' className='label'>
            Inserisci il link a nuova immagine per la homepage
          </label>
          <input
            id='homeImg'
            type='text'
            className='text-input'
            placeholder="Link all'immagine"
            {...register('homeImg', { required: true })}
            onChange={handleImageChange} // Aggiorna sia il form che l'anteprima
          />
          {errors.homeImg?.type === 'required' && (
            <p role='alert' className=''>
              Devi inserire un link a un&apos;immagine
            </p>
          )}
        </div>

        <button
          type='submit'
          className='submit-btn'
        >
          Carica
        </button>
      </form>
    </>
  );
}
