import type { PostListSearch } from '@/app/(app)/blog/page';
import { OLD_FIRST } from '@/lib/constants';
import * as motion from 'framer-motion/client';
import ClickView from '../motion/click-view';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog';
import SearchPanel from './search-panel';

export default function SideMenu() {
  return (
    <motion.div
      className="sticky top-20 self-start flex flex-col gap-3"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <Dialog>
        <DialogTrigger>
          <ClickView>
            <span className="i-ri-search-2-line" />
          </ClickView>
        </DialogTrigger>
        <DialogContent>
          <DialogTitle>Search</DialogTitle>
          <SearchPanel />
        </DialogContent>
      </Dialog>
      <ClickView>
        <span className="i-ri-arrow-up-down-line" />
      </ClickView>
    </motion.div>
  );
}
