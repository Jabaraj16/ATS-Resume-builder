import React, { Children } from 'react';
import { Reorder, useDragControls } from 'framer-motion';
import { GripVertical } from 'lucide-react';

const SortableSection = ({ item, children }) => {
    const controls = useDragControls();

    return (
        <Reorder.Item
            value={item}
            dragListener={false}
            dragControls={controls}
            style={{ marginBottom: '1rem' }}
        >
            {/* Clone the child (FormSection) to inject the dragHandle */}
            {React.isValidElement(children)
                ? React.cloneElement(children, {
                    dragHandle: (
                        <div
                            onPointerDown={(e) => controls.start(e)}
                            style={{
                                cursor: 'grab',
                                color: 'var(--color-text-muted)',
                                display: 'flex',
                                alignItems: 'center',
                                paddingRight: '0.5rem'
                            }}
                        >
                            <GripVertical size={20} />
                        </div>
                    )
                })
                : children
            }
        </Reorder.Item>
    );
};

export default SortableSection;
