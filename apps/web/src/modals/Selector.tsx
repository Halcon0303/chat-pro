// Copyright (c) 2022 Sri Lakshmi Kanthan P
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { HTMLAttributes, useState } from "react";
import {
  DialogContentText,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Select,
  MenuItem,
  SelectChangeEvent,
  FormControl,
  InputLabel,
} from "@mui/material";

interface ISelectorProps extends HTMLAttributes<HTMLDivElement> {
  onSelected: (val: string) => void;
  isOpen: boolean;
  onClose: () => void;
  list: string[];
  title: string;
}

export default function Selector(props: ISelectorProps) {
  // is noe able to cancel the Selection
  const [isCancelable, setIsCancelable] = useState(true);

  // is now ready to Select the value
  const [isReady, setIsReady] = useState(false);

  // current selected value
  const [selected, setSelected] = useState<string>("");

  // on Selection
  const handleSelection = (evt: SelectChangeEvent) => {
    // set cancelable to false
    setIsCancelable(false);

    // set is ready to false
    setIsReady(false);

    // set selected value
    setSelected(evt.target.value);

    // set cancelable to true
    setIsCancelable(true);

    // set is ready to true
    setIsReady(true);
  }

  // on Cancel
  const handleCancel = () => {
    setIsCancelable(false);
    setIsReady(false);
    props.onClose();
  }

  // on Close
  const handleClose = () => {
    props.onClose();
  }

  // on Submit
  const handleSubmit = () => {
    props.onSelected(selected);
  }

  // render
  return (
    <Dialog open={props.isOpen} onClose={handleClose}>
      <DialogTitle>{props.title}</DialogTitle>
      <DialogContent>
        <DialogContentText>Select one of the value from the list</DialogContentText>
        <FormControl fullWidth className="mt-3">
          <InputLabel id="selector-label">Select</InputLabel>
          <Select onChange={handleSelection} value={selected}
            label="Select" labelId="selector-label"
          >
            {props.list.map((val, index) => (
              <MenuItem key={index} value={val}>{val}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button
          disabled={!isCancelable}
          onClick={handleCancel}
        >
          Cancel
        </Button>
        <Button
          onClick={handleSubmit}
          disabled={!isReady}
        >
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
}
