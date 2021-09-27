# **DISCLAIMER: I'm still learning CSS/HTML/JS/React/R3F so go easy if shit is wonky, hopefully you can at least take inspiration**
# simpleBox
## Simple Cannon/Gesture Performance Trick (R3F)
Simple fix for the fucky performance interaction between Cannon/Gesture.

## How it works/How to use
You use this component with another 3D mesh object. With the props you pass, it creates a Compoundbody set of colliders and creates simple box (for now) meshes for 
detecting gestures. Feel free to get rid of the Cannon part if you have no need for it.
This way, way less needs to be calculated if you have a complex 3D mesh object and are applying gestures. 

## What you need to pass
1. Position of your mesh in the scene.
2. Rotation of your mesh in the scene.
3. Scale of your mesh in the scene. 
4. An array of your box colliders.
5. Also add a ref to your Simplebox instance to make your original 3D object follow it. 

## Examples or something
### Example of using useFrame to copy SimpleBox's position and rotation to imitate gestures and physics if using Cannon. 

```
const ref = useRef();
  const box = useRef();
  useFrame(() => {
    box.current.position.x = ref.current.position.x;
    box.current.position.y = ref.current.position.y;
    box.current.position.z = ref.current.position.z;
    box.current.rotation.x = -ref.current.rotation.x;
    box.current.rotation.y = ref.current.rotation.y;
    box.current.rotation.z = ref.current.rotation.z;
  });
  var boxes = [
    { type: "Box", position: [0, -0.8, 0], args: [0.4, 7.2, 5.8] },
    { type: "Box", position: [0, 3.2, -1.7], args: [0.4, 2.2, 2.4] },
    { type: "Box", position: [0, 3.2, 1.7], args: [0.4, 2.2, 2.4] },
    { type: "Box", position: [0, 4.0, 0], args: [0.4, 0.4, 0.9] },
  ];
```
### Example in DOM
```
   <SimpleBox  ref = {ref}rotationInScreen={[0, Math.PI / 2, 0]} colliders={boxes} positionInScreen={[-8,-15,-1.2]}/>
   <group ref={box} {...props} dispose={null} scale={1}>
        <mesh
          geometry={nodes.Cube.geometry}
          material={nodes.Cube.material}
          raycast={meshBounds}
          scale={[0.15, 4.3, 2.9]}
          castShadow
          receiveShadow
        />
   </group>
```
