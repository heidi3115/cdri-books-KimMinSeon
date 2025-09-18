import { cloneElement, type ReactElement, type ReactNode, type MouseEvent, useState } from 'react';
import { MenuItem, Popover, TextField } from '@mui/material';
import styled from '@emotion/styled';
import CloseIcon from '@mui/icons-material/Close';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

type PopoverProps = {
    trigger: ReactElement;
    target?: string;
    children?: ReactNode;
    submitText?: string;
    maxHeight?: number;
    isShowButton?: boolean;
    returnFunction?: (data: { selectedTarget: string; searchText: string }) => void;
};

const StyledPopover = styled.div<{ maxHeight: number }>`
    position: relative;
    width: 360px;
    height: 100px;
    max-height: ${(props) => props.maxHeight ?? '160'}px;
    padding: 30px 10px;
    border-radius: 8px;
    display: flex;
    flex-direction: column;
    gap: 15px;
    align-items: center;
`;

const CloseButton = styled.div`
    position: absolute;
    top: 5px;
    right: 5px;
    background: none;

    button {
        color: #b1b8c0;
        border: none;
        background: none;
        padding: 0;
    }

    svg {
        width: 20px;
        height: 20px;
    }
`;

const ChildrenWrapper = styled.div`
    display: flex;
    gap: 10px;

    input {
        border-bottom: 1px solid pink;
    }
`;

const PopoverSubmitButton = styled.button`
    width: 312px;
    background: #4880ee;
    color: #fff;
    padding: 10px;
`;

const TARGETS = [
    {
        value: 'title',
        label: '제목',
    },
    {
        value: 'person',
        label: '저자명',
    },
    {
        value: 'publisher',
        label: '출판사',
    },
];

const CommonPopOver = ({
    trigger,
    target,
    children,
    submitText = '검색하기',
    maxHeight = 160,
    isShowButton = true,
    returnFunction,
}: PopoverProps) => {
    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    const [selectedTarget, setSelectedTarget] = useState('title');
    const [searchText, setSearchText] = useState('');

    const handleClick = (e: MouseEvent<HTMLElement>) => {
        setAnchorEl(e.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    return (
        <div>
            {cloneElement(trigger as ReactElement<any>, {
                onClick: (e: MouseEvent<HTMLElement>) => handleClick(e),
            })}
            <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}
                slotProps={{
                    paper: {
                        sx: {
                            marginTop: '10px',
                        },
                    },
                }}
            >
                <StyledPopover maxHeight={maxHeight}>
                    <CloseButton>
                        <button onClick={handleClose}>
                            <CloseIcon />
                        </button>
                    </CloseButton>
                    {children ?? (
                        <ChildrenWrapper>
                            <TextField
                                id="standard-select-currency"
                                select
                                defaultValue={target ?? 'title'}
                                onChange={(e) => setSelectedTarget(e.target.value)}
                                variant="standard"
                                sx={{
                                    width: '100px',
                                }}
                                slotProps={{
                                    select: {
                                        IconComponent: KeyboardArrowDownIcon,
                                    },
                                }}
                            >
                                {TARGETS.map((option) => (
                                    <MenuItem key={option.value} value={option.value}>
                                        {option.label}
                                    </MenuItem>
                                ))}
                            </TextField>
                            <TextField
                                id="standard-basic"
                                variant="standard"
                                placeholder="검색어 입력"
                                onChange={(e) => setSearchText(e.target.value)}
                                sx={{
                                    width: '208px',
                                }}
                            />
                        </ChildrenWrapper>
                    )}
                    {isShowButton && returnFunction && (
                        <PopoverSubmitButton
                            onClick={() => returnFunction({ selectedTarget, searchText })}
                        >
                            {submitText}
                        </PopoverSubmitButton>
                    )}
                </StyledPopover>
            </Popover>
        </div>
    );
};

export default CommonPopOver;
