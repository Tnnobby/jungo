import { useRef } from "react";
import Bedsheet from "../components/Bedsheet";
import { BedsheetRef } from "../components/Bedsheet/bedsheet";

export default function TimerBedsheet () {
  const bedsheetRef = useRef<BedsheetRef>()
  
  return (
    <Bedsheet ref={bedsheetRef}>

    </Bedsheet>
  )
}