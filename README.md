# RESPONSI 2 
# PAKET A

SALSABILLA PSW - H1D021063 - SHIFT F 

![image](https://github.com/user-attachments/assets/11e14109-dc25-4df2-895d-d610d3fb8122)

![image](https://github.com/user-attachments/assets/4449a4a2-7832-4336-982e-eb723d38b47b)

![image](https://github.com/user-attachments/assets/44ef8705-5d8f-4f95-8626-83bf07ebd5ce)

![image](https://github.com/user-attachments/assets/c318b4bf-f06e-4bd6-9e21-eb2dd8b7810c)

![image](https://github.com/user-attachments/assets/4909b989-0f52-47e0-9d32-a641a093c289)

![image](https://github.com/user-attachments/assets/cd9eba72-f98f-4fc4-b4de-e94191962b97)

![image](https://github.com/user-attachments/assets/d9fb8a86-75db-44f1-b450-4239644a89d8)

![image](https://github.com/user-attachments/assets/24103bdd-b772-428d-b972-5188fb063010)

![image](https://github.com/user-attachments/assets/b0b6e15d-37af-435e-96b6-5be7d1da2343)

![image](https://github.com/user-attachments/assets/2329db5e-63f4-41ea-91e1-dceb5c176bca)

SOURCE CODE 

1. ![image](https://github.com/user-attachments/assets/a7291f70-d077-4c67-96f3-1be030c968cb)
   Pada bagian Create, data balapan baru ditambahkan ke dalam database Firestore. Fungsi yang digunakan adalah addBalapan, yang menerima parameter berupa objek balapan yang tidak mengandung id, createdAt, atau updatedAt, karena Firestore akan mengisinya secara otomatis.
   Fungsi ini memanggil getBalapanRef untuk mendapatkan referensi ke koleksi balapans pada Firestore milik pengguna yang sedang login.
   Data balapan kemudian ditambahkan ke koleksi tersebut dengan menggunakan fungsi addDoc.
   Selain data balapan, fungsi ini juga menambahkan status, createdAt, dan updatedAt. Waktu saat data dibuat dan diperbarui menggunakan Timestamp.now() untuk mencatat waktu secara otomatis.
2. ![image](https://github.com/user-attachments/assets/99e4bb52-d16d-42ed-9552-0bed245c3f00)
   Untuk membaca data, digunakan fungsi getBalapans yang mengambil semua data balapan dari koleksi balapans pengguna yang sedang login. Data diurutkan berdasarkan waktu pembaruan (updatedAt), dari yang terbaru.
   Fungsi ini mengambil referensi ke koleksi balapans menggunakan getBalapanRef. Fungsi query digunakan untuk mengurutkan data berdasarkan updatedAt dalam urutan menurun (terbaru di atas).
   Kemudian, menggunakan getDocs untuk mengambil snapshot data dari Firestore dan mengonversinya menjadi array objek balapan.
3. ![image](https://github.com/user-attachments/assets/51e394d9-a311-4135-a9c0-8f3dc09b9ae1)
   Untuk memperbarui data balapan yang sudah ada, digunakan fungsi updateBalapan. Fungsi ini membutuhkan ID dokumen yang ingin diperbarui dan data balapan yang baru.
   Fungsi ini mendapatkan referensi ke dokumen yang akan diperbarui menggunakan doc(db, "users", auth.currentUser?.uid!, "balapans", id). Kemudian, menggunakan updateDoc untuk memperbarui dokumen dengan data yang baru. Selain itu, waktu pembaruan (updatedAt) juga diperbarui menggunakan Timestamp.now().
4. ![image](https://github.com/user-attachments/assets/71de695c-ab05-41f1-b0cb-dd129981b4c0)
   Untuk menghapus data balapan, digunakan fungsi deleteBalapan, yang menghapus dokumen berdasarkan ID yang diberikan.
   Fungsi ini mendapatkan referensi ke dokumen yang akan dihapus dengan menggunakan doc dan ID dokumen.
   Kemudian, menggunakan deleteDoc untuk menghapus dokumen tersebut dari koleksi balapans.
