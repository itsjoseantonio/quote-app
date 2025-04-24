'use client';

// ====== Components ====== //
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogFooter,
    DialogTitle,
    DialogDescription,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

interface ConfirmModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
}

const ConfirmModal = ({ isOpen, onClose, onConfirm }: ConfirmModalProps) => (
    <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent>
            <DialogHeader>
                <DialogTitle>Are you sure?</DialogTitle>
                <DialogDescription>
                    This will permanently delete the quote.
                </DialogDescription>
            </DialogHeader>
            <DialogFooter>
                <Button variant='ghost' onClick={onClose}>
                    Cancel
                </Button>
                <Button className='' onClick={onConfirm}>
                    Delete
                </Button>
            </DialogFooter>
        </DialogContent>
    </Dialog>
);

export default ConfirmModal;
