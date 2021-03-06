import React, { forwardRef, useRef, useEffect, useState } from "react";
import {useThree, instancedMesh } from "@react-three/fiber";
import * as THREE from "three";
import { useGesture } from "react-use-gesture";

const tempObject = new THREE.Object3D();

export const SimpleGeometry = forwardRef((props, forwarded) => {

  const { size, viewport } = useThree();
  const aspect = size.width / viewport.width;
  var count = props.colliders.length;
  let [currentPosx, currentPosy] = [0, 0];
  const mesh = useRef();

  let dragged = false;
  const handleChange = () => {
    props.setDrag(dragged);
}
  useEffect(() => { 
    let i = 0;
    for (let x = 0; x < count; x++) {
      const id = i++;
      
  
      tempObject.scale.set(
        props.colliders[x].args[0],
        props.colliders[x].args[1],
        props.colliders[x].args[2]
      );

      tempObject.updateMatrix();

      forwarded.current.setMatrixAt(id, tempObject.matrix);

      forwarded.current.instanceMatrix.needsUpdate = true;
    }
  }, []);
  const bind = useGesture({

    onDrag: ({ movement: [x, y], first: intial}) => {
      dragged= true;
      handleChange()
      console.log(currentPosy - y)

      forwarded.current.position.set(
        ((x - currentPosx) / aspect) * 1.2 + props.lastPos[0],
        ((currentPosy - y) / aspect) * 1.2 + props.lastPos[1],
        0
      );
    
 
    },
    onDragEnd: ({}) => {
      dragged= false;
      handleChange()
    }
  });
  

  return (
  
      <instancedMesh
      ref={forwarded}
        {...bind()}
        position={props.positionCol}
        rotation={props.rotationCol}
        setDrag={handleChange}
        args={[null, null, count]}
      >
        <boxBufferGeometry attach="geometry"></boxBufferGeometry>
        <meshStandardMaterial
          transparent={true}
          opacity={0}
          attach="material"
        />
      </instancedMesh>

   
 
  );
});
