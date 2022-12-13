export interface Props {
    inputKey: string;
    imageSrc?: string;

    onSelectImage: (e: File) => void;
    onDeleteImage: () => void;
} 