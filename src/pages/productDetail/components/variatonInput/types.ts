export interface Props {
    nameValue: string;
    nameValueOnChange: (e: string) => void;

    variationValue: string[];
    variationValueOnChange: (e: string[]) => void;

    onDelete: () => void;
}