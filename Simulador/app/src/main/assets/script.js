document.addEventListener("DOMContentLoaded", () => {
  let isBlueScreenNewlyActive = false;
  const partidoItems = document.querySelectorAll(".partido-item");
  const partyModal = document.getElementById("party-modal");
  const closeButton = partyModal.querySelector(".close-button");

  // Referencias a los elementos DENTRO del modal para la nueva estructura
  const alcaldeName = document.getElementById("alcalde-name");
  const candidateSlots = document.querySelectorAll(".candidate-slot");

  let currentSelectedPartyItem = null;
  let currentSelectedSlot = null;

  // Función para abrir el modal
  const openModal = (partyItem) => {
    partyModal.classList.remove("show");
    // Quitar la clase 'selected' de la tarjeta de partido anterior si hay una
    if (currentSelectedPartyItem && currentSelectedPartyItem !== partyItem) {
      currentSelectedPartyItem.classList.remove("selected");
    }
    partyItem.classList.add("selected"); // Asegura que la tarjeta actual esté seleccionada
    currentSelectedPartyItem = partyItem; // Almacena la tarjeta seleccionada

    // Deseleccionar cualquier slot previamente seleccionado en el modal
    if (currentSelectedSlot) {
      currentSelectedSlot.classList.remove("selected-slot");
      currentSelectedSlot = null;
    }

    // Obtener la información del partido
    // ASUMIMOS que data-candidates es una lista de nombres en el orden: [Alcalde, Nominal1, Nominal2, Lista1, Lista2]
    const candidatesData = partyItem.dataset.candidates;
    let candidatesArray = [];
    if (candidatesData) {
      candidatesArray = candidatesData.split(",").map((c) => c.trim());
    }

    // Llenar la sección del Alcalde
    // Usar un nombre de archivo de foto más robusto, por ejemplo, limpio de espacios y acentos
    const partyNameCleaned = partyItem.dataset.partyName
      .toLowerCase()
      .replace(/\s+/g, "-")
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");
    alcaldeName.textContent = candidatesArray[0] || "Candidato a Alcalde";

    // Llenar los 4 slots de candidatos
    candidateSlots.forEach((slot, index) => {
      // Asignamos candidatos de la lista, asumiendo que el índice 0 es el alcalde,
      // y luego los siguientes 4 son para los slots (index + 1)
      const candidateName = candidatesArray[index + 1] || `Vacío ${index + 1}`;
      slot.querySelector("p").textContent = candidateName;
    });

    // Mostrar el modal
    setTimeout(() => {
      partyModal.classList.add("show");
    }, 50);
  };

  // Función para cerrar el modal
  const closeModal = () => {
    if (currentSelectedPartyItem) {
      currentSelectedPartyItem.classList.remove("selected");
      currentSelectedPartyItem = null;
    }
    if (currentSelectedSlot) {
      currentSelectedSlot.classList.remove("selected-slot");
      currentSelectedSlot = null;
    }
    partyModal.classList.remove("show"); // Asegúrate que tu modal tenga la clase 'show' para ocultarse

    // --- PUNTO CRÍTICO ---
    const blueScreen = document.getElementById("pantalla-azul");
    console.log("Elemento pantalla-azul:", blueScreen); // VERIFICA ESTO EN LA CONSOLA

    if (blueScreen) {
      blueScreen.classList.add("show-blue");
      isBlueScreenNewlyActive = true;
      console.log("Clase 'show-blue' añadida a pantalla-azul."); // Confirma que se añadió
      setTimeout(() => {
        isBlueScreenNewlyActive = false;
      }, 100);
    } else {
      console.error(
        "ERROR: No se encontró el elemento con ID 'pantalla-azul'."
      );
    }
  };

  // Event listener para cada tarjeta de partido
  partidoItems.forEach((item) => {
    item.addEventListener("click", () => {
      openModal(item);
    });
  });

  // Event listeners para el botón de cerrar y el overlay
  closeButton.addEventListener("click", closeModal);
  partyModal.addEventListener("click", (e) => {
    if (e.target === partyModal) {
      closeModal();
    }
  });

  document.addEventListener("click", (e) => {
    // Si la bandera indica que la pantalla azul acaba de activarse
    if (isBlueScreenNewlyActive) {
      // Ignora este clic, ya que es el mismo que la activó.
      // La bandera se desactivará en breve por el setTimeout de closeModal.
      return;
    }

    const blueScreen = document.getElementById("pantalla-azul");

    // Ahora, solo si la pantalla azul está visible y no es el "clic inicial"
    if (blueScreen && blueScreen.classList.contains("show-blue")) {
      blueScreen.classList.remove("show-blue");
      // También podrías resetear la bandera aquí si no usas el setTimeout en closeModal
      // isBlueScreenNewlyActive = false;
    }
  });

  // Event listener para los slots de candidatos dentro del modal
  candidateSlots.forEach((slot) => {
    slot.addEventListener("click", () => {
      if (currentSelectedSlot) {
        currentSelectedSlot.classList.remove("selected-slot");
      }
      slot.classList.add("selected-slot");
      currentSelectedSlot = slot;

      const slotType = slot.dataset.slotType;
      const candidateName = slot.querySelector("p").textContent;
      console.log(
        `Slot de candidato seleccionado: ${candidateName} (Tipo: ${slotType})`
      );

      // Aquí puedes añadir lógica de votación para este candidato/opción
    });
  });
  // Registrar el Service Worker
  if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
      navigator.serviceWorker
        .register("./service-worker.js")
        .then((registration) => {
          console.log("Service Worker registrado con éxito:", registration);
        })
        .catch((error) => {
          console.error("Fallo el registro del Service Worker:", error);
        });
    });
  }
});
