AFRAME.registerComponent("enemy-bullets", {
    init: function () {
        setInterval(this.shootEnemyBullet, 1500)
    },
    shootEnemyBullet: function () {
        var els = document.querySelectorAll(".enemy")
        
        for(var i = 0; i < els.length; i++){
            //entidad de la bala enemiga
            var enemyBullet = document.createElement('a-entity')

            enemyBullet.setAttribute('geometry', {
                primitive: 'sphere',
                radius: 0.1,
            })

            enemyBullet.setAttribute('material', 'color', '#282829')

            var position = els[i].getAttribute('position')
            enemyBullet.setAttribute('position',{
                x: position.x + 1.5,
                y: position.y + 3.5,
                z: position.z
            })

            var scene = document.querySelector("#scene")
            scene.appendChild(enemyBullet)

            var position1 = new THREE.Vector3()
            var position2 = new THREE.Vector3()
            
            //direccion del disparo}
            var enemy = els[i].object3D
            var player = document.querySelector("#weapon").object3D

            player.getWorldPosition(position1)
            enemy.getWorldPosition(position2)

            //establece la velocidad y su dirección
            var direction = new THREE.Vector3()
            direction.subVectors(position1, position2).normalize()

            enemyBullet.setAttribute('velocity', direction.multiplyScalar(20))

            enemyBullet.setAttribute('dynamic-body', {
                shape: "sphere",
                mass: -0.01
            })
            var element = document.querySelector("#countLife")
            var playerLife = parseInt(element.getAttribute("text").value)

            enemyBullet.addEventListener("collide", (e)=>{
                if(e.detail.body.el.id === "weapon"){
                    if(playerLife > 1){
                        playerLife -=1
                        element.setAttribute("text", {
                            value: playerLife
                        })
                    }else{
                        var txt = document.querySelector("#over")
                        txt.setAttribute("visible", true)
                        console.error("Has perdido")

                        element.setAttribute("text", {
                            value: 0
                        })

                        var tankEl = document.querySelectorAll(".enemy")
                        for(var i = 0; i < tankEl.length; i++){
                            scene.removeChild(tankEl[i])
                        }
                    }
                    
                }
            })
        }
        
    },

});
