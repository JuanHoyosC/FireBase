
// Initialize Cloud Firestore through Firebase
firebase.initializeApp({
    apiKey: "AIzaSyCFVelwnZ9hG17r4OCGOrXW4Gtc8ViOFV0",
    authDomain: "blockchain-98b67.firebaseapp.com",
    projectId: "blockchain-98b67",
});

var db = firebase.firestore();

function agregar() {
    nombre = document.getElementById('nombre').value;
    apellido = document.getElementById('apellido').value;
    descripcion = document.getElementById('descripcion').value;
    console.log(nombre);
    db.collection("users").add({
        first: nombre,
        last: apellido,
        descripcion: descripcion
    })
        .then(function (docRef) {
            document.getElementById('nombre').value = '';
            document.getElementById('apellido').value = '';
            document.getElementById('descripcion').value = '';
        })
        .catch(function (error) {
            console.error("Error adding document: ", error);
        });


}

//Leer datos
var tabla = document.getElementById('tabla');
db.collection("users").onSnapshot((querySnapshot) => {
    tabla.innerHTML = '';
    querySnapshot.forEach((doc) => {
        tabla.innerHTML += `             
        <tr>
            <th scope="row">${doc.id}</th>
            <td>${doc.data().first}</td>
            <td>${doc.data().last}</td>
            <td>${doc.data().descripcion}</td>
            <td><button class = "btn btn-warning" onclick = "actualizar('${doc.id}','${doc.data().first}','${doc.data().last}','${doc.data().descripcion}')" >Editar</button></td>
            <td><button class = "btn btn-danger" onclick = "eliminar('${doc.id}')">Eliminar</button></td>
        </tr>`
    });
});

//Eliminar

function eliminar(id) {
    db.collection("users").doc(id).delete().then(function () {
        console.log("Document successfully deleted!");
    }).catch(function (error) {
        console.error("Error removing document: ", error);
    });
}

//Actualizar

function actualizar(id, nombre, apellido, descripcion) {
    var user = db.collection("users").doc(id);
    document.getElementById('nombre').value = nombre;
    document.getElementById('apellido').value = apellido;
    document.getElementById('descripcion').value = descripcion;
    var boton = document.getElementById('boton');
    boton.value = 'Editar';

    boton.onclick = function () {
        nombre = document.getElementById('nombre').value;
        apellido = document.getElementById('apellido').value;
        descripcion = document.getElementById('descripcion').value;
        // Actualiza
        return user.update({
            first: nombre,
            last: apellido,
            descripcion: descripcion
        })
            .then(function () {
                console.log("Document successfully updated!");
                boton.value = "Guardar";
                document.getElementById('nombre').value = '';
                document.getElementById('apellido').value = '';
                document.getElementById('descripcion').value = '';
                boton.onclick=function(){
                    agregar();
                }
            })
            .catch(function (error) {
                // The document probably doesn't exist.
                console.error("Error updating document: ", error);
            });
    }
}