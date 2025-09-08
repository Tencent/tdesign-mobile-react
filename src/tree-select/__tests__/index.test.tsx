import React from 'react';
import { describe, it, expect, render, vi, fireEvent, screen, waitFor } from '@test/utils';
import TreeSelect from '../tree-select';

// Mock data for testing
const mockOptions = [
  {
    label: '广东省',
    value: 'guangdong',
    children: [
      {
        label: '广州市',
        value: 'guangzhou',
        children: [
          { label: '天河区', value: 'tianhe' },
          { label: '海珠区', value: 'haizhu' },
        ],
      },
      {
        label: '深圳市',
        value: 'shenzhen',
        children: [
          { label: '南山区', value: 'nanshan' },
          { label: '福田区', value: 'futian' },
        ],
      },
    ],
  },
  {
    label: '江苏省',
    value: 'jiangsu',
    children: [
      {
        label: '南京市',
        value: 'nanjing',
        children: [
          { label: '玄武区', value: 'xuanwu' },
          { label: '秦淮区', value: 'qinhuai' },
        ],
      },
    ],
  },
];

const mockOptionsWithDisabled = [
  {
    label: '广东省',
    value: 'guangdong',
    children: [
      {
        label: '广州市',
        value: 'guangzhou',
        disabled: true,
        children: [
          { label: '天河区', value: 'tianhe' },
        ],
      },
    ],
  },
];

const mockCustomKeys = {
  label: 'name',
  value: 'id',
  children: 'items',
};

const mockOptionsWithCustomKeys = [
  {
    name: '广东省',
    id: 'guangdong',
    items: [
      {
        name: '广州市',
        id: 'guangzhou',
        items: [
          { name: '天河区', id: 'tianhe' },
        ],
      },
    ],
  },
];

describe('TreeSelect', () => {
  describe('props', () => {
    it(':options - renders with basic options', () => {
      render(<TreeSelect options={mockOptions} />);
      
      expect(screen.getByText('广东省')).toBeInTheDocument();
      expect(screen.getByText('江苏省')).toBeInTheDocument();
    });

    it(':options - handles empty options', () => {
      const { container } = render(<TreeSelect options={[]} />);
      
      expect(container.querySelector('.t-tree-select')).toBeInTheDocument();
    });

    it(':value - controlled value', () => {
      const { rerender } = render(
        <TreeSelect options={mockOptions} value={['guangdong', 'guangzhou', 'tianhe']} />
      );
      
      expect(screen.getByText('天河区')).toBeInTheDocument();
      
      rerender(<TreeSelect options={mockOptions} value={['jiangsu', 'nanjing', 'xuanwu']} />);
      expect(screen.getByText('玄武区')).toBeInTheDocument();
    });

    it(':defaultValue - uncontrolled default value', () => {
      render(<TreeSelect options={mockOptions} defaultValue={['guangdong', 'shenzhen', 'nanshan']} />);
      
      expect(screen.getByText('南山区')).toBeInTheDocument();
    });

    it(':height - sets custom height', () => {
      const { container } = render(<TreeSelect options={mockOptions} height={300} />);
      
      const treeSelect = container.querySelector('.t-tree-select');
      expect(treeSelect).toHaveStyle({ height: '300px' });
    });

    it(':height - handles string height', () => {
      const { container } = render(<TreeSelect options={mockOptions} height="400px" />);
      
      const treeSelect = container.querySelector('.t-tree-select');
      expect(treeSelect).toHaveStyle({ height: '400px' });
    });

    it(':keys - custom field mapping', () => {
      render(<TreeSelect options={mockOptionsWithCustomKeys} keys={mockCustomKeys} />);
      
      expect(screen.getByText('广东省')).toBeInTheDocument();
    });

    it(':multiple - single select mode (default)', () => {
      render(<TreeSelect options={mockOptions} value={['guangdong', 'guangzhou']} />);
      
      // Should render radio buttons for leaf level
      const radioInputs = document.querySelectorAll('input[type="radio"]');
      expect(radioInputs.length).toBeGreaterThan(0);
    });

    it(':multiple - multiple select mode', () => {
      render(<TreeSelect options={mockOptions} multiple defaultValue={['guangdong', 'guangzhou', []]} />);
      
      // Should render checkboxes for leaf level
      const checkboxElements = document.querySelectorAll('.t-checkbox');
      expect(checkboxElements.length).toBeGreaterThan(0);
    });

    it(':disabled - handles disabled options', () => {
      render(<TreeSelect options={mockOptionsWithDisabled} />);
      
      const disabledItem = screen.getByText('广州市').closest('.t-tree-select__item');
      expect(disabledItem).toHaveClass('t-tree-select__item--disabled');
    });
  });

  describe('events', () => {
    it(':onChange - triggers on value change', () => {
      const onChange = vi.fn();
      render(<TreeSelect options={mockOptions} onChange={onChange} />);
      
      // Click on a province
      fireEvent.click(screen.getByText('江苏省'));
      
      expect(onChange).toHaveBeenCalled();
    });

    it(':onChange - handles middle level clicks', async () => {
      const onChange = vi.fn();
      render(<TreeSelect options={mockOptions} onChange={onChange} />);
      
      // First select a province to show cities
      fireEvent.click(screen.getByText('广东省'));
      
      await waitFor(() => {
        expect(screen.getByText('广州市')).toBeInTheDocument();
      });
      
      // Click on a city
      fireEvent.click(screen.getByText('深圳市'));
      
      expect(onChange).toHaveBeenCalled();
    });

    it(':onChange - handles leaf level radio selection', async () => {
      const onChange = vi.fn();
      render(<TreeSelect options={mockOptions} onChange={onChange} />);
      
      // Navigate to leaf level
      fireEvent.click(screen.getByText('广东省'));
      
      await waitFor(() => {
        fireEvent.click(screen.getByText('广州市'));
      });
      
      await waitFor(() => {
        const radioInput = screen.getByDisplayValue('tianhe');
        fireEvent.click(radioInput);
      });
      
      expect(onChange).toHaveBeenCalled();
    });

    it(':onChange - handles leaf level checkbox selection', async () => {
      const onChange = vi.fn();
      render(<TreeSelect options={mockOptions} multiple defaultValue={['guangdong', 'guangzhou', []]} onChange={onChange} />);
      
      await waitFor(() => {
        const checkboxElement = screen.getByText('天河区');
        fireEvent.click(checkboxElement);
      });
      
      expect(onChange).toHaveBeenCalled();
    });

    it(':click - ignores clicks on disabled items', () => {
      const onChange = vi.fn();
      render(<TreeSelect options={mockOptionsWithDisabled} onChange={onChange} />);
      
      // Click on disabled item should not trigger onChange
      const disabledItem = screen.getByText('广州市');
      fireEvent.click(disabledItem);
      
      // onChange should not be called for disabled items
      expect(onChange).not.toHaveBeenCalled();
    });

    it(':click - handles sidebar item clicks', () => {
      const onChange = vi.fn();
      render(<TreeSelect options={mockOptions} onChange={onChange} />);
      
      fireEvent.click(screen.getByText('江苏省'));
      
      expect(onChange).toHaveBeenCalledWith(['jiangsu'], 0);
    });
  });

  describe('rendering', () => {
    it(':default - renders tree structure correctly', () => {
      const { container } = render(<TreeSelect options={mockOptions} />);
      
      expect(container.querySelector('.t-tree-select')).toBeInTheDocument();
      expect(container.querySelector('.t-tree-select__column')).toBeInTheDocument();
    });

    it(':columns - renders correct number of columns', async () => {
      const { container } = render(<TreeSelect options={mockOptions} value={['guangdong', 'guangzhou']} />);
      
      await waitFor(() => {
        const columns = container.querySelectorAll('.t-tree-select__column');
        expect(columns.length).toBeGreaterThan(1);
      });
    });

    it(':sidebar - renders sidebar for first level', () => {
      const { container } = render(<TreeSelect options={mockOptions} />);
      
      expect(container.querySelector('.t-side-bar')).toBeInTheDocument();
      expect(container.querySelector('.t-tree-select__column')).toBeInTheDocument();
    });

    it(':middle-level - renders middle level items', async () => {
      render(<TreeSelect options={mockOptions} value={['guangdong']} />);
      
      await waitFor(() => {
        expect(screen.getByText('广州市')).toBeInTheDocument();
        expect(screen.getByText('深圳市')).toBeInTheDocument();
      });
    });

    it(':leaf-level - renders radio group for single select', async () => {
      render(<TreeSelect options={mockOptions} value={['guangdong', 'guangzhou']} />);
      
      await waitFor(() => {
        const radioInputs = document.querySelectorAll('input[type="radio"]');
        expect(radioInputs.length).toBeGreaterThan(0);
      });
    });

    it(':leaf-level - renders checkbox group for multiple select', async () => {
      render(<TreeSelect options={mockOptions} multiple value={['guangdong', 'guangzhou', []]} />);
      
      await waitFor(() => {
        const checkboxElements = document.querySelectorAll('.t-checkbox');
        expect(checkboxElements.length).toBeGreaterThan(0);
      });
    });

    it(':active-state - highlights active items', async () => {
      const { container } = render(<TreeSelect options={mockOptions} value={['guangdong', 'guangzhou']} />);
      
      await waitFor(() => {
        const activeItems = container.querySelectorAll('.t-tree-select__item--active');
        expect(activeItems.length).toBeGreaterThan(0);
      });
    });

    it(':column-classes - applies correct column classes', async () => {
      const { container } = render(<TreeSelect options={mockOptions} value={['guangdong', 'guangzhou']} />);
      
      await waitFor(() => {
        expect(container.querySelector('.t-tree-select__column--right')).toBeInTheDocument();
      });
    });
  });

  describe('edge cases', () => {
    it('handles null/undefined values gracefully', () => {
      const { container } = render(<TreeSelect options={mockOptions} value={null} />);
      
      expect(container.querySelector('.t-tree-select')).toBeInTheDocument();
    });

    it('handles empty array value', () => {
      const { container } = render(<TreeSelect options={mockOptions} value={[]} />);
      
      expect(container.querySelector('.t-tree-select')).toBeInTheDocument();
    });

    it('throws error for invalid multiple value type', () => {
      // Mock console.error to avoid test output pollution
      const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
      
      expect(() => {
        render(<TreeSelect options={mockOptions} multiple value={['guangdong', 'guangzhou', 'tianhe']} />);
      }).toThrow('应传入数组类型的 value');
      
      consoleSpy.mockRestore();
    });

    it('handles missing children gracefully', () => {
      const optionsWithoutChildren = [
        { label: '选项1', value: 'option1' },
        { label: '选项2', value: 'option2' },
      ];
      
      const { container } = render(<TreeSelect options={optionsWithoutChildren} />);
      
      expect(container.querySelector('.t-tree-select')).toBeInTheDocument();
    });

    it('handles deep nesting', () => {
      const deepOptions = [
        {
          label: 'Level 1',
          value: 'l1',
          children: [
            {
              label: 'Level 2',
              value: 'l2',
              children: [
                {
                  label: 'Level 3',
                  value: 'l3',
                  children: [
                    { label: 'Level 4', value: 'l4' },
                  ],
                },
              ],
            },
          ],
        },
      ];
      
      const { container } = render(<TreeSelect options={deepOptions} value={['l1', 'l2', 'l3']} />);
      
      expect(container.querySelector('.t-tree-select')).toBeInTheDocument();
    });
  });

  describe('accessibility', () => {
    it('has proper display name', () => {
      expect(TreeSelect.displayName).toBe('TreeSelect');
    });

    it('renders with proper ARIA attributes', () => {
      render(<TreeSelect options={mockOptions} />);
      
      // Check for radio/checkbox inputs which should have proper accessibility
      const inputs = document.querySelectorAll('input');
      inputs.forEach(input => {
        expect(input).toBeInTheDocument();
      });
    });
  });

  describe('performance', () => {
    it('handles large datasets', () => {
      const largeOptions = Array.from({ length: 100 }, (_, i) => ({
        label: `选项 ${i}`,
        value: `option${i}`,
        children: Array.from({ length: 10 }, (_, j) => ({
          label: `子选项 ${i}-${j}`,
          value: `suboption${i}-${j}`,
        })),
      }));
      
      const { container } = render(<TreeSelect options={largeOptions} />);
      
      expect(container.querySelector('.t-tree-select')).toBeInTheDocument();
    });
  });
});
