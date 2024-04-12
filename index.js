class Character {
   constructor(name, health, damage) {
      this.name = name;
      this.health = health;
      this.maxhealth = health;
      this.damage = damage;
   }
   //Verifica si el personaje esta vivo
   isAlive() {
      return this.health > 0;
   }

   //Ataca a otro personaje seleccionado
   attack(target) {
      console.log(`${this.name} deals ${this.damage} DMG to ${target.name}`);
      target.health -= this.damage;
   }

   //Retorna la información actual del personaje
   status() {
      return `${this.name} - HP ${this.health}/${this.maxhealth}`;
   }
}

const getLifeBarColor = (percent) => {
   if (percent > 50) {
      return "#00ff00";
   } else if (percent > 20) {
      return "#ffcc00";
   } else {
      return "#ff0000";
   }
};

const updateLifeBar = (character, elementId) => {
   const lifeBarInner = document.querySelector(`#${elementId} .life__bar-inner`);
   const percent = (character.health / character.maxhealth) * 100;
   lifeBarInner.style.width = percent > 0 ? `${percent}%` : "0%";
   lifeBarInner.style.backgroundColor = getLifeBarColor(percent);
   lifeBarInner.innerHTML = percent > 0 ? `${character.health}/${character.maxhealth}` : "DEAD";
};

const randomizeAttackValues = () => {
   const random = Math.random() * (10 - 5) + 5;
   return Math.round(random);
};

const randomizeLifeValues = () => {
   const random = Math.random() * (100 - 1) + 1;
   return Math.round(random);
};

//Función para combatir
function fight() {
   const firstCharacter = new Character("Heroe", randomizeLifeValues(), randomizeAttackValues());
   const secondCharacter = new Character("Limo", randomizeLifeValues(), randomizeAttackValues());

   alert(
      `Heroe: Vida -> ${firstCharacter.maxhealth} Daño -> ${firstCharacter.damage} \nEnemigo: Vida -> ${secondCharacter.maxhealth} Daño -> ${secondCharacter.damage}`
   );

   updateLifeBar(firstCharacter, "hero");
   updateLifeBar(secondCharacter, "enemy");

   const handleCharacterAttack = (event) => {
      if (event.key === "n" && secondCharacter.isAlive()) {
         secondCharacter.attack(firstCharacter);
         updateLifeBar(firstCharacter, "hero");
         checkGameOver();
      } else if (event.key === "x" && firstCharacter.isAlive()) {
         firstCharacter.attack(secondCharacter);
         updateLifeBar(secondCharacter, "enemy");
         checkGameOver();
      }
   };

   document.addEventListener("keydown", handleCharacterAttack);

   const checkGameOver = () => {
      if (!firstCharacter.isAlive()) {
         console.log(`${firstCharacter.name} died!`);
         document.removeEventListener("keydown", handleCharacterAttack);
         alert(`${secondCharacter.name} ha ganado el juego!`);
      } else if (!secondCharacter.isAlive()) {
         console.log(`${secondCharacter.name} died!`);
         document.removeEventListener("keydown", handleCharacterAttack);
         alert(`${firstCharacter.name} ha ganado el juego!`);
      }
   };
}
