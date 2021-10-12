# **DISCLAIMER: I'm still learning CSS/HTML/JS/React/R3F so go easy if shit is wonky, hopefully you can at least take inspiration**
# simpleBox
## Simple R3F/Gesture Performance Trick (R3F)
Simple fix for the fucky performance interaction between R3F/Gesture.

## How it works/How to use
You use this component with another 3D mesh object. With the props you pass, it creates simple boxes (for now) meshes from the collider array prop for 
detecting gestures. 
This way, way less needs to be calculated if you have a complex 3D mesh object and are applying gestures. 

## What you need to pass
1. Position of your mesh in the scene.
2. Rotation of your mesh in the scene.
3. Scale of your mesh in the scene. 
4. An array of your box colliders.
5. Also add a ref to your Simplebox instance to make your original 3D object follow it. 

## Examples or something
### Example of using useFrame to copy SimpleBox's position and rotation to imitate gestures.

```
const box = useRef();
  const position = useRef([0, 0, 0]);
  const rot = useRef([0, 0, 0]);
  const [ref, api] = useCompoundBody(() => ({
    mass: 1,
    position: [0, -15, 1],
    rotation: [0, -Math.PI / 2, 0],
    shapes: boxes,
    ...props,
  }));
  useEffect(() => {
    const unsubscribe = api.position.subscribe((v) => (position.current = v));
    return unsubscribe;
  }, []);
  useEffect(() => {
    const unsubscribe = api.rotation.subscribe((v) => (rot.current = v));
    return unsubscribe;
  }, []);
  const [dragging, setDrag] = useState(false);
  const [lastPos, setLastPos] = useState([0,0])
  
  useFrame(() => {
    
    if (dragging === false) {
      box.current.position.set(
        position.current[0],
        position.current[1],
        position.current[2]
      ); //this isnt the problem
      box.current.rotation.set(rot.current[0], rot.current[1], rot.current[2]); 
      setLastPos([position.current[0], position.current[1]])
      api.wakeUp();
    }  if(dragging === true) {
      
      api.sleep();
      api.position.copy(box.current.position);
      api.rotation.copy(box.current.rotation);

    }
  });
  function handleChange(newValue) {
    setDrag(newValue);
  }
  var boxes = HologramBoxes
```
### Example in DOM
```
      <SimpleGeometry
        ref={box}
        colliders={boxes}
        positionCol={[0, -15, 1]}
        rotationCol={[0, -Math.PI / 2, 0]}
        setDrag={handleChange}
        lastPos={lastPos}
      />
      <group ref={ref} {...props} dispose={null}>
        <mesh geometry={nodes.Sphere.geometry}raycast={meshBounds} material={materials.legs} />
      </group>
```
