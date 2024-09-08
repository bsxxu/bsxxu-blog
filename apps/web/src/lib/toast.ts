import toast from 'react-hot-toast';

export function successToast(msg: string) {
  toast.success(msg, {
    duration: 2000,
    position: 'bottom-right',
    style: {
      border: '2px solid hsl(var(--bk-minor))',
      background: 'hsl(var(--bk)',
      color: 'hsl(var(--ft))',
    },
  });
}

export function errorToast(msg: string) {
  toast.error(msg, {
    duration: 2000,
    position: 'bottom-right',
    style: {
      border: '2px solid hsl(var(--bk-minor))',
      background: 'hsl(var(--bk)',
      color: 'hsl(var(--ft))',
    },
  });
}
