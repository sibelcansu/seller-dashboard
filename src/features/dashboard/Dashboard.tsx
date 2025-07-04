import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabaseClient";
import { Link, useNavigate} from "react-router";


export type Product = {
  id: number;
  name: string;
  description: string;
  price: number;
  image_url: string;
  user_id: string;
};

const Dashboard = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    supabase
      .from("products")
      .select("*")
      .order("created_at", { ascending: false })
      .then(({ data, error }) => {
        if (error) {
          alert("Hata: " + error.message);
          return;
        }
        setProducts(data || []);
        setLoading(false);
      });
  }, []);

  const handleLogout = async () => {
  await supabase.auth.signOut();
  navigate("/");
};

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Satıcı Paneli</h1>
        <Link to="/add-product">
          <button className="bg-red-400 hover:bg-red-600 text-white px-4 py-2 rounded shadow">
            + Yeni Ürün Ekle
          </button>
        </Link>
        <button
      onClick={handleLogout}
      className="bg-gray-300 hover:bg-gray-500 text-white px-4 py-2 rounded shadow"
    >
      Çıkış Yap
    </button>
      </div>

      {loading ? (
        <p className="text-center text-lg">Yükleniyor...</p>
      ) : products.length === 0 ? (
        <p>Henüz ürün eklenmemiş.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {products.map((product) => (
            <div
              key={product.id}
              className="border rounded-lg p-4 shadow hover:shadow-md transition"
            >
              <img
                src={product.image_url}
                alt={product.name}
                className="w-full h-48 object-cover rounded mb-4"
              />
              <h2 className="text-lg font-semibold">{product.name}</h2>
              <p className="text-gray-600 text-sm">{product.description}</p>
              <p className="text-red-600 mt-2 font-bold">{product.price} TL</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
