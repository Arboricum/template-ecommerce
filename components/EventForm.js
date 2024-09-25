'use client';

import { useForm, Controller } from 'react-hook-form';
//import DatePicker from 'react-datepicker';
//import 'react-datepicker/dist/react-datepicker.css';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createEvent, updateEvent } from '@/lib/actions/event.action';
import { useLoadingContentContext } from '@/context/loadingContext';
import { useUploadThing } from '@/lib/uploadthing';
import { ImageUploader } from './ImageUploader';
import { toast } from 'react-hot-toast';
import './EventForm.css'

/* 
title, description, shortDescription, imageUrl, imageUrls(array), category, dimensions, description, price, forSell, quantity
*/

export default function EventForm({ userId, type, event, eventId }) {
  console.log(userId, type)
  const [files, setFiles] = useState([]);
  const { loadingContent, setLoadingContent } = useLoadingContentContext();
  const initialValues =
    event && type === 'Update'
      ? {
          ...event
        }
      : {};

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: initialValues,
  });

  const router = useRouter();

  const { startUpload } = useUploadThing('imageUploader');

  const doSubmit = async values => {
    let uploadedImageUrl = values.imageUrl;
    setLoadingContent(true);

    if (files.length > 0) {
      const uploadedImages = await startUpload(files);
      console.log('Risultato del caricamento delle immagini:', uploadedImages);

      if (!uploadedImages || uploadedImages.length === 0) {
        console.log('Caricamento immagini fallito o risposta vuota.');
        setLoadingContent(false);
        return;
      }


      uploadedImageUrl = uploadedImages[0].url;
    }

    if (type === 'Create') {
      try {
        const newEvent = await createEvent(
          userId,
          { ...values, imageUrl: uploadedImageUrl, forSell: values.forSell === 'true' },
          '/admin'
        );

        if (newEvent) {
          toast.success('New Event Added');
          setLoadingContent(false);
          router.push(`/admin/manageShop`);
        }
      } catch (error) {
        toast.error('Addition Error!');
        setLoadingContent(false);
        console.log(error);
      }
    }

    if (type === 'Update') {
      try {
        const updatedEvent = await updateEvent({
          userId,
          event: { ...values, imageUrl: uploadedImageUrl, _id: eventId },
          path: `/events/${eventId}`,
        });

        if (updatedEvent) {
          toast.success('Event Updated');
          setLoadingContent(false);
          router.push(`/admin/manageShop`);
        }
      } catch (error) {
        toast.error('Update Error!');
        setLoadingContent(false);
        console.log(error);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit(doSubmit)} className='event-form'>
      <div className='form-control img-uploader'>
        <label htmlFor='imageUrl' className='label'>
          Carica l&apos;immagine del prodotto
        </label>
        <Controller
          name='imageUrl'
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <ImageUploader
              onFieldChange={field.onChange}
              imageUrl={field.value}
              setFiles={setFiles}
            />
          )}
        />
        {errors.imageUrl?.type === 'required' && (
          <p role='alert' className=''>
            L&apos;immagine è obbligatoria
          </p>
        )}
        <p>oppure</p>
        <p>Inserisci un link</p>
        <p>oppure</p>
        <p>Riusa una immagine precedente</p>
      </div>

      <div className='form-container'>
        <div className='form-control'>
          <label htmlFor='title' className='label'>
            Nome del prodotto
          </label>
          <input
            id='title'
            type='text'
            className='text-input'
            placeholder='Nome del prodotto'
            {...register('title', { required: true })}
          />
          {errors.title?.type === 'required' && (
            <p role='alert' className='input-error'>
              Il nome è obbligatorio
            </p>
          )}
        </div>

        <div className='form-control'>
          <label htmlFor='description' className='label'>
            Descrizione
          </label>
          <textarea
            id='description'
            className='text-input'
            placeholder='Descrivi il prodotto'
            rows={5}
            {...register('description', { required: true })}
          ></textarea>
          {errors.description?.type === 'required' && (
            <p role='alert' className='input-error'>
              La descrizione è obbligatoria
            </p>
          )}
        </div>

        <div className='form-control'>
          <label htmlFor='shortDescription' className='label'>
            Descrizione breve
          </label>
          <textarea
            id='shortDescription'
            className='text-input'
            placeholder='Descrivi brevemente il prodotto'
            rows={3}
            {...register('shortDescription', { required: true })}
          ></textarea>
          {errors.shortDescription?.type === 'required' && (
            <p role='alert' className='input-error'>
              La descrizione breve è obbligatoria
            </p>
          )}
        </div>

        <div className='form-control'>
          <label htmlFor='category' className='label'>
            Categoria
          </label>
          <select
            id='category'
            {...register('category', { required: true })}
            className='select-input'
          >
            <option value=''> Seleziona la categoria</option>
            <option value='Ceramiche'>Ceramiche</option>
            <option value='Fotografie'>Fotografie</option>
            <option value='Majette'>Majette</option>
            <option value='Cappelli'>Cappelli</option>
            <option value='Spille'>Spille</option>
            <option value='Varie'>Varie</option>
          </select>
          {errors.category?.type === 'required' && (
            <p role='alert' className='text-red-600 text-sm pt-2'>
              La categoria è obbligatoria
            </p>
          )}
        </div>

        <div className='form-control'>
          <label htmlFor='dimensions' className='label'>
            Dimensioni del prodotto (opzionale)
          </label>
          <input
            id='dimensions'
            type='text'
            className='text-input'
            placeholder='Dimensioni del prodotto'
            {...register('dimensions', { required: false })}
          />
        </div>

        <div className='form-control'>
          <label htmlFor='price' className='label'>
            Prezzo
          </label>
          <input
            id='price'
            type='number'
            className='number-input'
            min={0}
            placeholder='0'
            {...register('price', { required: true })}
          />
          {errors.price?.type === 'required' && (
            <p role='alert' className='input-error'>
              Il prezzo è obbligatorio
            </p>
          )}
        </div>

        <div className='form-control'>
            <label className='label'>
            In vendita
            </label>
            <div className='radio-form'>
            <label className='label'>
                <input
                type='radio'
                value='true'
                name='forSell'
                {...register('forSell', { required: true })}
                className='radio radio-primary'
                />
                <span className='ml-2'>Si</span>
            </label>
            <label className='label'>
                <input
                type='radio'
                value='false'
                name='forSell'
                {...register('forSell', { required: true })}
                className='radio radio-primary'
                />
                <span className='ml-2'>No</span>
            </label>
            </div>
            {errors.forSell?.type === 'required' && (
            <p role='alert' className='text-red-600 text-sm pt-2'>
                Seleziona un&apos;opzione
            </p>
            )}
        </div>

        <div className='form-control'>
          <label htmlFor='quantity' className='label'>
            Quantità disponibile
          </label>
          <input
            id='quantity'
            type='number'
            className='number-input'
            min={0}
            placeholder='10'
            {...register('quantity', { required: true })}
          />
          {errors.quantity?.type === 'required' && (
            <p role='alert' className='input-error'>
              La quantità è obbligatoria
            </p>
          )}
        </div>
      </div>

      <button
        type='submit'
        className='submit-btn'
        disabled={loadingContent}
      >
        CREA PRODOTTO
      </button>
    </form>
  );
}