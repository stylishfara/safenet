import AlertCall from "@/components/mobile/alert-call"

const HOSPITALS = [
  { name: "37 military hospital", address: "#124 Adjinor St", eta: "~13 min ETA" },
  { name: "Ridge hospital", address: "#124 Adjinor St", eta: "~15 min ETA" },
  { name: "Korlebu teaching hospital", address: "#124 Adjinor St", eta: "~17 min ETA" },
  { name: "Emmanuel clinic", address: "#124 Adjinor St", eta: "~19 min ETA" },
  { name: "Osu general hospital", address: "#90 Oxford St", eta: "~20 min ETA" },
  { name: "Success hospital", address: "#22 Spintex Rd", eta: "~22 min ETA" },
  { name: "Spintex clinic", address: "#22 Spintex Rd", eta: "~25 min ETA" },
  { name: "Circle hospital", address: "#8 Circle St", eta: "~12 min ETA" },
]

export default function MedicalAlert() {
  return (
    <AlertCall
      bgColor="#4f6db8"
      callingText="Calling the nearest hospital."
      callStatus="Calling..."
      activeStation="37 military hospital"
      listTitle="Hospitals near you"
      stations={HOSPITALS}
    />
  )
}
