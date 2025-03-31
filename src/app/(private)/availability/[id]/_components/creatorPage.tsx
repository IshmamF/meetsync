import { useState } from "react"
import AvailabilityModal from "./availPopUp"

export default function CreatorPage() {
    const [options, setOptions] = useState<string[]>([])
    return (
        <div>
            <div>Creator</div>
            <AvailabilityModal
                setOptions={setOptions}
                options={options}
            />
            <div>
                {options}
            </div>
        </div>
    )
}