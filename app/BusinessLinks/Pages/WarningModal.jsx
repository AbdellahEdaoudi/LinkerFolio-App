import Image from "next/image";

const WarningModal = () => (
    <dialog id="my_modal_2" className="modal">
        <div className="modal-box">
            <Image
                width={600}
                height={600}
                src="/prfl.png"
                alt="prfl.png"
                className="rounded-md object-cover"
            />
        </div>
        <form method="dialog" className="modal-backdrop">
            <button>Close</button>
        </form>
    </dialog>
);

export default WarningModal