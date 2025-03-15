import { db, storage } from "../../firebase";
import { collection, addDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

const Bubble3D = () => {
  const [posts, setPosts] = useState([]);

  const addPost = async (position, file) => {
    try {
      // Upload do arquivo para o Firebase Storage
      const storageRef = ref(storage, `posts/${file.name}`);
      await uploadBytes(storageRef, file);
      const fileUrl = await getDownloadURL(storageRef);

      // Salvar a postagem no Firestore
      const postData = {
        position,
        content: fileUrl,
        type: file.type, // Tipo de mídia (imagem, vídeo, áudio)
        createdAt: new Date(),
      };
      const docRef = await addDoc(collection(db, "posts"), postData);

      // Atualizar o estado local
      setPosts([...posts, { id: docRef.id, ...postData }]);
    } catch (error) {
      console.error("Erro ao adicionar postagem:", error);
    }
  };

  return (
    <Canvas camera={{ position: [0, 0, 10], fov: 75 }}>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      <Sphere args={[5, 32, 32]} onClick={(e) => addPost(e.point)}>
        <meshStandardMaterial color="lightblue" transparent opacity={0.8} />
      </Sphere>
      {posts.map((post) => (
        <Html key={post.id} position={post.position}>
          <div style={{ background: "white", padding: "10px", borderRadius: "5px" }}>
            <p>Post {post.id}</p>
            {post.type.startsWith("image") && <img src={post.content} alt="Post" width="100" />}
            {post.type.startsWith("video") && (
              <video controls width="100">
                <source src={post.content} type={post.type} />
              </video>
            )}
            {post.type.startsWith("audio") && (
              <audio controls>
                <source src={post.content} type={post.type} />
              </audio>
            )}
          </div>
        </Html>
      ))}
      <OrbitControls enablePan={true} enableZoom={true} enableRotate={true} />
    </Canvas>
  );
};

export default Bubble3D;