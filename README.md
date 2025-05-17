# Book-List-App

1.	Introducere

În era digitală, aplicațiile web au devenit o parte integrantă a vieții cotidiene, oferind soluții rapide și accesibile pentru diverse nevoi personale sau profesionale. O componentă importantă a dezvoltării moderne de software este utilizarea serviciilor cloud, care permit stocarea și procesarea datelor fără a depinde de infrastructura fizică locală.
În cadrul acestui proiect, ne propunem să demonstrăm utilitatea acestor servicii cloud prin integrarea lor într-o aplicație web simplă, dedicată pasionaților de lectură. Scopul este de a crea un instrument care să permită fiecărui utilizator să-și gestioneze cu ușurință propria listă de cărți.

2. Descrierea problemei

Gestionarea lecturilor personale poate deveni o provocare atunci când cititorii nu au un sistem centralizat în care să își organizeze titlurile de interes. Deși există aplicații specializate, acestea pot fi uneori prea complexe pentru nevoile unui utilizator simplu care dorește doar să urmărească ce cărți vrea să citească, ce citește în prezent și ce a finalizat. Proiectul propus răspunde acestei nevoi printr-o soluție minimalistă: o aplicație web care permite crearea unui profil simplu (pe baza unui nume de utilizator) și gestionarea unei liste de lectură personale, cu opțiuni de adăugare, editare și ștergere a titlurilor.
Aplicația este dezvoltată cu ajutorul frameworkului Next.js (bazat pe Node.js și React) și se conectează la o bază de date cloud MongoDB pentru stocarea datelor utilizatorilor și a cărților.

3.	Descriere API

Aplicația prezintă un API REST simplu, care permite operațiuni de tip CRUD (Create, Read, Update, Delete) asupra listei de cărți asociate fiecărui utilizator. Comunicarea dintre client (interfața web) și baza de date se face prin endpoint-uri definite în Next.js, folosind metode HTTP standard: POST pentru creare, GET pentru citire, PUT pentru actualizare și DELETE pentru ștergere.
Datele sunt stocate într-o bază de date MongoDB, gestionată prin serviciul MongoDB Atlas — o platformă cloud ce oferă o instanță MongoDB accesibilă online, ușor de conectat la aplicații. MongoDB este o bază de date NoSQL, orientată pe documente, care folosește formatul JSON pentru salvarea datelor. Acest model de stocare este ideal pentru aplicații web dinamice, întrucât permite flexibilitate în structurarea datelor. 
De asemenea, proiectul utilizează Vercel ca platformă de hostare pentru aplicație. Vercel este o soluție cloud special concepută pentru aplicații dezvoltate cu Next.js, oferind o integrare nativă cu acest framework. Folosind Vercel, întreaga aplicație — atât partea vizibilă utilizatorului, cât și rutele API din backend — este distribuită rapid și eficient, fără a fi nevoie de configurări complexe ale serverului. Un alt avantaj important al platformei Vercel este integrarea directă cu GitHub, ceea ce înseamnă că fiecare modificare a codului poate fi automat publicată online printr-un proces simplu de re-deploy.

4.	Flux de date

Aplicația urmează un flux simplu de interacțiune între client și server, utilizând următoarele metode HTTP:

![image](https://github.com/user-attachments/assets/2db15ab7-7bdc-4dfd-9465-0f089f0b3f48)

Mai jos sunt prezentate câteva exemple de request / response din Postman, instrumentul folosit pentru testarea API-urilor.

![image](https://github.com/user-attachments/assets/d9bf5e7b-c2c0-4673-bd5d-435ee9939d11)

Deoarece numele utilizatorului este furnizat în corpul cererii, metoda utilizată este POST. Spre deosebire de GET, care transmite datele în mod vizibil prin URL, POST permite trimiterea acestor informații în request body, reducând astfel riscul de expunere. În plus, această abordare este mai flexibilă și mai sigură, pregătind aplicația pentru eventuale extinderi, cum ar fi autentificarea sau transmiterea altor date confidențiale.

![image](https://github.com/user-attachments/assets/28de5f15-3eb2-4bab-a442-5b82b836a846)

După cum se poate observa, metoda POST pentru adăugarea unei cărți în lista unui cititor a funcționat cu succes, noul obiect inserat fiind vizibil în colecția MongoDB. De asemenea, se remarcă apariția unui nou câmp, bookId, generat automat cu scopul de a identifica în mod unic fiecare obiect.

![image](https://github.com/user-attachments/assets/98881e8b-7d27-40b8-af8b-bcce286c5508)

În ceea ce privește autorizarea serviciilor cloud utilizate, sunt folosite mecanisme specifice pentru a proteja accesul la date și pentru a respecta bunele practici de securitate. Conectarea la MongoDB Atlas se face printr-un connection string securizat, care conține datele de autentificare ale unui utilizator la baza de date. Acest connection string este stocat într-o variabilă de mediu (în fișierul .env), astfel încât să nu fie vizibil în codul sursă. 
Vercel permite autorizarea prin conectarea contului GitHub și folosirea infrastructurii de deploy securizate oferite de platformă. Tot acolo sunt gestionate și variabilele de mediu necesare rulării aplicației în cloud, fără a expune detalii sensibile către utilizatori.

5.	Capturi de ecran aplicație

![image](https://github.com/user-attachments/assets/0e163e30-55a4-4e37-8262-8182f95f81f2)
![image](https://github.com/user-attachments/assets/fd633f5a-dd9b-4f73-99ad-b6c3770049d4)

6. Referințe

https://www.mongodb.com/
https://vercel.com/
https://nextjs.org/
https://www.postman.com/



