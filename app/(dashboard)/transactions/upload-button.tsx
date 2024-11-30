import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";
import { useCSVReader } from 'react-papaparse';

type Props ={
    onUpload: (results: any) => void;
}

export const UploadButton = ({onUpload}: Props) => {
    const {CSVReader} = useCSVReader()  

    return (
        <CSVReader onUploadAccepted={onUpload}>
            {({getRootProps}: any) => (
                <Button
                    size={"sm"}
                    className="w-full lg:w-auto" 
                {...getRootProps()}>
                    <Upload className="mr-2 h-4 w-4" />
                    Import
            </Button>
            )}
        </CSVReader>
    ) ;
};

