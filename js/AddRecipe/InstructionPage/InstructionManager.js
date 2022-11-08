import { useEffect, useState } from "react";
import { View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { editInstruction } from "../../../redux/reducers/newRecipeReducer";
import { setFullPageOverlay } from "../../../redux/reducers/overlayReducer";
import AddStep from "./AddStep";
import InstructionItem from "./InstructionItem";

const NULL_PLACEHOLDER = 'NEW_DESCRIPTION';

export default function InstructionManager ({...props}) {
  const { value: overlayValue, state: overlayState } = useSelector(state => state.overlay)
  const instructions = useSelector(state => state.edit_recipe.instructions);
  const [activeOverlay, setActiveOverlay] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (activeOverlay !== false && overlayState === 'idle') {
      // console.log('Dispatching Update for', activeOverlay)
      const overlay_index = activeOverlay.split('_')[1];
      overlayValue !== NULL_PLACEHOLDER && dispatch(editInstruction([overlay_index, overlayValue]))
      setActiveOverlay(false)
    }
  }, [overlayState])

  const addHandle = () => {
    setActiveOverlay(`instruction_${instructions.length}`)
    dispatch(setFullPageOverlay({ overlay: "instructionedit", id: `instruction_${instructions.length}`, value: 'NEW_DESCRIPTION'}))
  }

  const openEdit = (data, index) => {
    setActiveOverlay(`instruction_${index}`)
    dispatch(setFullPageOverlay({ overlay: "instructionedit", id: `instruction_${index}`, value: data}))
  }

  return (
    <View>
      {instructions.map((data, index) => {
        return <InstructionItem key={`instruction_${index}`} description={data} step={index + 1} onPress={() => openEdit(data, index)}/>
      })}
      
      <AddStep onPress={addHandle}/>
    </View>
  )
}