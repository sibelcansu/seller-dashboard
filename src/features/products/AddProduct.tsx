import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

import { supabase } from '../../lib/supabaseClient';
import { useNavigate } from 'react-router';

type FormData = {
  name: string;
  description: string;
  price: number;
  image: FileList;
};

const AddProduct = () => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>();
  const [userId, setUserId] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setUserId(data.user?.id ?? "");
    });
  }, []);

  const uploadImage = async (file: File): Promise<string> => {
    const fileName = `${Date.now()}-${file.name}`;
    const { error } = await supabase.storage.from("products").upload(fileName, file);

    if (error) {
      throw error;
    }

    const { data } = supabase.storage.from("products").getPublicUrl(fileName);
    return data.publicUrl;
  };

  const onSubmit = async (data: FormData) => {
    if (!userId) {
      alert("Kullanıcı bilgisi alınamadı.");
      return;
    }

    setLoading(true);

    try {
      const file = data.image[0];
      const imageUrl = await uploadImage(file);

      const { error } = await supabase.from("products").insert([{
        name: data.name,
        description: data.description,
        price: data.price,
        image_url: imageUrl,
        user_id: userId
      }]);

      if (error) {
        alert("Ürün eklenemedi: " + error.message);
      } else {
        alert("Ürün başarıyla eklendi.");
        reset(); // formu temizle
        navigate("/products"); // yönlendirme
      }

    } catch (error: any) {
      alert("Hata oluştu: " + error.message);
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='gap-4 flex flex-col max-w-md mx-auto mt-15 p-4 border rounded shadow'>
      <h1 className="text-3xl mb-4">Ürün Ekle</h1>

      <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-4'>

        <div>
          <input
            {...register("name", { required: "Ürün adı zorunludur" })}
            placeholder="Ürünün Adı"
            className='border rounded p-2 w-full'
          />
          {errors.name && <p className='text-red-500 text-sm'>{errors.name.message}</p>}
        </div>

        <div>
          <input
            {...register("description", { required: "Açıklama zorunludur" })}
            placeholder="Ürünün Açıklaması"
            className='border rounded p-2 w-full'
          />
          {errors.description && <p className='text-red-500 text-sm'>{errors.description.message}</p>}
        </div>

        <div>
          <input
            type="number"
            step="0.01"
            {...register("price", {
              required: "Fiyat zorunludur",
              min: { value: 0.01, message: "Fiyat en az 0.01 olmalıdır" }
            })}
            placeholder="Ürünün Fiyatı"
            className='border rounded p-2 w-full'
          />
          {errors.price && <p className='text-red-500 text-sm'>{errors.price.message}</p>}
        </div>

        <div>
          <input
            type="file"
            accept="image/*"
            {...register("image", { required: "Görsel zorunludur" })}
            className="border rounded p-2 w-full file:bg-red-300 file:text-white file:px-4"
          />
          {errors.image && <p className='text-red-500 text-sm'>{errors.image.message}</p>}
        </div>

        <button
          type="submit"
          className='bg-red-600 text-white py-3 rounded'
          disabled={loading}
        >
          {loading ? "Yükleniyor..." : "Ürünü Kaydet"}
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
