/**
 * Condition si utilisateur connecté
 */
let token = localStorage.getItem("Token");

if (token) {
  /**
   *
   */
  function displayAdminButtons() {
    // Création du bouton n°1
    const banner = document.querySelector(".editing-tools-banner");
    banner.innerHTML = `
      <button class="editing-tools_position modal-button">
				<i class="fa-regular fa-pen-to-square"></i>
				<p>Mode édition</p>
			</button>
			<button class="apply-change-btn">Publier les changements</button>
      `;

    // Création du bouton n°2

    // Création du bouton n°3
    // Création la modale n°1
    // Remplissage de la modale n°1
    // Création la modale n°2
    // Remplissage de la modale n°2

    // Création des listeners sur le button n°1
    const btnModal = document.querySelector(".apply-change-btn");
    btnModal.addEventListener("click", () => {
      modal.showModal();
    });
    //Création des listeners sur le button n°2
  }

  // Sélection des éléments du DOM
  // Sélection de la modale d'inscription
  function displayModal(worksArray) {
    let modalContentHTML = "";
    worksArray.forEach((work) => {
      modalContentHTML += `
            <div class="modal_img-edit_position">
                <img src="${work.imageUrl}">
                <i class="fa-regular fa-trash-can modal_trash-icon" data-id="${work.id}"></i>
                <i class="fa-solid fa-arrows-up-down-left-right modal_arrow-icon"></i>
                <p>éditer</p>
            </div>
        `;
    });
    modalImg.innerHTML = modalContentHTML;
    const modalDeleteWorkIcon = document.querySelectorAll(".modal_trash-icon");

    // Supprimer les works
    // Lorsque l'utilisateur clique sur l'icône de la corbeille, le work est supprimé du backend et de l'interface utilisateur
    let deleteRequest = {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    // Supprimer les works
    // Lorsque l'utilisateur clique sur l'icône de la corbeille, le work est supprimé du backend et de l'interface utilisateur
    modalDeleteWorkIcon.forEach((trashcan) => {
      trashcan.addEventListener("click", () => {
        const workId = trashcan.getAttribute("data-id");
        fetch(`http://localhost:5678/api/works/${workId}`, deleteRequest).then(
          (res) => {
            // Si la requête est un succès, alors on supprime le work de l'interface utilisateur et du tableau des works
            if (res.ok) {
              trashcan.parentElement.remove();
              const deletefigure = document.querySelector(
                `figure[data-id="${workId}"]`
              );
              deletefigure.remove();
            }
          }
        );
      });
    });
  }

  /**
   *  Fonction qui regroupe les différentes manière d'ouvrir et de fermé la modale
   */
  function OpenAndCloseModal() {
    modalButton[2].addEventListener("click", () => {
      modal.showModal();
    });
  }

  // Fermer la modale lorsque l'on clique en dehors de la modale ou sur le bouton fermer
  window.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.close();
    }
  });

  // Fermer la modale lorsque l'utilisateur clique sur le bouton de fermeture
  closeModalIcon.addEventListener("click", () => {
    modal.close();
  });

  /**
   * Fonction qui permet de générer des differentes catègories lors de la création d'un nouveau projet
   */
  function generateCategoryOptions() {
    // Générer les options de catégories pour le select de creation de projets
    let optionsHTML = "";
    categories.forEach((category) => {
      // Pour chaque catégorie, on crée une option avec la valeur de l'id de la catégorie et le nom de la catégorie
      // Ces options sont ajoutées à la variable optionsHTML
      optionsHTML += `<option value="${category.id}">${category.name}</option>`;
    });
    return optionsHTML;
  }

  // Fonction qui récupère les works
  async function importCategories() {
    return await fetch("http://localhost:5678/api/categories")
      .then((res) => res.json())
      .then((categories) => {
        // Générer les options de catégories pour le select de creation de projets
        // Pour chaque catégorie, on crée une option avec la valeur de l'id de la catégorie et le nom de la catégorie
        let options = "";
        categories.forEach(
          (category) =>
            (options += `<option value="${category.id}">${category.name}</option>`)
        );
        return options;
      });
  }
  /**
   * Fonction qui ajoute un nouveau work avec titre, catégorie et image
   */
  function displayAddWorkModal() {
    let initialModalContentHTML = "";
    const modalAddWorkBtn = document.querySelector(".modal_add-btn");

    // Ajouter un work
    // Lorsque l'utilisateur clique sur le bouton "Ajouter un work", une modale s'ouvre avec un formulaire pour ajouter un nouveau work à partir du formulaire
    // Lorsque l'utilisateur soumet le formulaire, un nouveau work est ajouté au backend et à l'interface utilisateur
    modalAddWorkBtn.addEventListener("click", async () => {
      const categories = await importCategories();

      initialModalContentHTML = modalContent.innerHTML;
      // Création de la modale
      // Lorsque l'utilisateur clique sur le bouton "Ajouter un work", une modale s'ouvre avec un formulaire
      // pour ajouter un nouveau work à partir du formulaire
      modalContent.innerHTML = "";
      modalContent.innerHTML = `
                <i class="fa-solid fa-arrow-left modal_add-work_return-icon"></i>
                <div class="modal_content_add-work">
                    <h3>Ajout photo</h3>
                    <form action="">
                        <div class="add-img-form">
                            <i class="fa-sharp fa-regular fa-image"></i>
                            <img src="" class="selected-img">
                            <label for="photo" class="form-add-img-button">+ Ajouter photo</label>
                            <input type="file" id="photo" name="photo">
                            <p>jpg, png : 4mo max</p>
                        </div>
                        <div>
                            <div class="modal_add-work_input">
                                <label for="titre">Titre</label>
                                <input type="text" id="titre" name="titre" autocomplete="off">
                            </div>
                            <div class="modal_add-work_input">
                                <label for="categorie">Catégorie</label>
                                <select name="categorie" id="categorie">
                                    ${categories}
                                </select>
                            </div>
                        </div>
                    </form>
                    <p class="invalid-form-message">Veuillez remplir tous les champs pour ajouter un projet</p>
                    <p class="valid-form-message">Formulaire enregistré !</p>
                    <p class="invalid-request-form-message">Une erreur s'est produite lors de la soumission du formulaire</p>
                    <span class="modal_line"></span>
                    <button class="modal_add-work_confirm-btn">Valider</button>
                </div>
            `;

      const photoInput = document.getElementById("photo");
      const titleInput = document.getElementById("titre");
      const selectInput = document.getElementById("categorie");
      const submitWorkButton = document.querySelector(
        ".modal_add-work_confirm-btn"
      );
      const selectedImage = document.querySelector(".selected-img");
      const invalidFormMessage = document.querySelector(
        ".invalid-form-message"
      );
      const validFormMessage = document.querySelector(".valid-form-message");
      const invalidRequestFormMessage = document.querySelector(
        ".invalid-request-form-message"
      );
      const returnToDefaultModalButton = document.querySelector(
        ".modal_add-work_return-icon"
      );

      // Fonction de retour sur la modale
      // Lorsque l'utilisateur clique sur le bouton de retour, la modale revient à son état initial et les champs sont vidés par défaut
      returnToDefaultModalButton.addEventListener("click", () => {
        modalContent.innerHTML = initialModalContentHTML;
        getWorks();
        displayAddWorkModal();
      });

      //Affichage de l'image lors de sa selection
      photoInput.addEventListener("change", () => {
        const file = photoInput.files[0];
        const reader = new FileReader();

        // Affichage de l'image lors de sa selection si le fichier est une image
        // Lorsque l'utilisateur sélectionne une image, l'image est affichée dans la modale
        reader.onload = (e) => {
          selectedImage.src = e.target.result;
          const addImgForm = document.querySelector(".add-img-form");
          const formElements = addImgForm.querySelectorAll(".add-img-form > *");

          formElements.forEach((element) => {
            // On cache les éléments du formulaire pour afficher l'image et le bouton supprimer
            element.style.display = "none";
          });
          // On affiche l'image et le bouton supprimer
          selectedImage.style.display = "flex";
        };
        reader.readAsDataURL(file);
      });

      /**
       * Ajouter des works
       */
      function createNewWork() {
        submitWorkButton.addEventListener("click", () => {
          // Ajouter un work
          if (
            // Si l'un des champs est vide, alors on affiche un message d'erreur
            photoInput.value === "" ||
            titleInput.value === "" ||
            selectInput.value === ""
          ) {
            // Si l'un des champs est vide, alors on affiche un message d'erreur
            invalidFormMessage.style.display = "block";
            return;
          }

          // Créer un objet FormData pour envoyer les données du formulaire
          let formData = new FormData();

          // Ajout des données du formulaire à l'objet FormData
          formData.append("image", photoInput.files[0]);
          formData.append("title", titleInput.value);
          formData.append("category", selectInput.value);

          // Envoi de la requête pour ajouter un work
          let addRequest = {
            method: "POST",
            headers: {
              Authorization: `Bearer ${token}`,
            },
            body: formData,
          };

          // Requête POST a l'API pour ajouter un work
          fetch("http://localhost:5678/api/works", addRequest).then((res) => {
            // Si la requête est un succès, alors on affiche un message de succès et on ajoute le work à l'interface utilisateur
            if (res.ok) {
              invalidFormMessage.style.display = "none";
              validFormMessage.style.display = "block";
              submitWorkButton.classList.add("active");
            }
            // Si la requête est un échec, alors on affiche un message d'erreur
            else {
              invalidFormMessage.style.display = "none";
              invalidRequestFormMessage.style.display = "block";
            }
          });
        });
      }
      createNewWork();
    });
  }

  /**
   * Fonction qui éxécute les fonctions du JS
   */
  async function init() {
    //displayAdminButtons();

    editingToolsBanner.style.display = "flex";

    modalButton.forEach((button) => {
      button.style.display = "flex";
    });

    login.innerHTML = "logout";
    login.addEventListener("click", () => {
      localStorage.removeItem("Token");
      window.location.href = "login.html";
    });

    const works = await getWorks();

    OpenAndCloseModal();
    displayModal(works);

    displayAddWorkModal();
  }

  init();
}
