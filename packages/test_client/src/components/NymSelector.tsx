import { buildPoseidon } from "circomlibjs";
import { useState } from "react";
import { useSignMessage } from "wagmi";

type Props = {
  onNymSelected: (nymCode: string, nymHash: string) => void;
};

export default function NymSelector({ onNymSelected }: Props) {
  const [nymCode, setNymCode] = useState("");

  const { signMessageAsync } = useSignMessage({
    message: nymCode,
  });

  const createNym = async () => {
    const signedNym = await signMessageAsync();

    const poseidon = await buildPoseidon();
    const F = poseidon.F;

    const nymHash = F.toObject(poseidon([signedNym])).toString(16);

    // TODO: this should probably be handled with component state
    const nymCodeInput = document.getElementById(
      "nymCodeInput"
    ) as HTMLInputElement;
    nymCodeInput.readOnly = true;

    onNymSelected(nymCode, nymHash);
  };

  return (
    <div>
      <input
        type="text"
        id="nymCodeInput"
        value={nymCode}
        onChange={(e) => setNymCode(e.target.value)}
      />

      <button onClick={() => createNym()}>select nym</button>
    </div>
  );
}
