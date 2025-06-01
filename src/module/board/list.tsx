import { useEffect, useMemo, useRef, useState } from 'react';
import { ThemeProvider } from '@emotion/react';
import { Box, Link, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, Pagination } from '@mui/material';
import { NavLink } from 'react-router-dom';
import { FaPencil } from "react-icons/fa6";
import { FiSettings } from 'react-icons/fi';
import { MdSearch } from "react-icons/md";
import { IoIosSave } from "react-icons/io";
import { RowBox } from '@/component/customMui';
import { EFieldType, EVariant, FormBuilder, TSection } from '@/component/formbuilder';
import { getBoardPostsList } from '@/function/amplify/rest/board';
import theme from './theme';
import './style.scss';
import { gqGetCategoryByBoard } from '@/function/amplify/graphql/post/gqGetCategory';
import { formatPostDate } from '@/function/amplify/formatPostDate';

interface IBoardPost {
  no: number
  id: string
  title: string
  author: string
  date: string
  views: number
  hasAttachment: boolean
  comments: number
}

interface IListProps {
  id: string
}

const List = ({id}: IListProps) => {
  const searchParam = new URLSearchParams(window.location.search);
  const rowsPerPage = 10;
  const formRef = useRef<HTMLFormElement>(null);
  const [categories, setCategories] = useState<any[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [data, setData] = useState<IBoardPost[]>([]);
  const [dataLoading, setDataLoading] = useState<boolean>(true);
  const [page, setPage] = useState(Number(searchParam.get('page') || 1));
  const [count, setCount] = useState(0);
  const [checkedRows, setCheckedRows] = useState<number[]>([]);
  
  const onPageChange = (_event: any , page: number) => { setPage(page); }
  
  useEffect(() => {
    gqGetCategoryByBoard(id).then((categories) => {
      setCategories(categories);
    });
  }, [])

  useEffect(() => {
    let filters = {};
    if (activeCategory !== 'All') { filters = { ...filters, category: activeCategory }; }
    setData([]);
    setDataLoading(true);
    getBoardPostsList(id, page, rowsPerPage, filters).then(async (board) => {
      const data: IBoardPost[] = board?.posts?.items?.map((post: any): IBoardPost => {
        return {
          no: post.postIndex,
          id: post.id,
          title: post.title,
          author: post.author,
          date: formatPostDate(post.createdAt),
          views: post.views,
          hasAttachment: (post.attachments?.items?.length ?? 0) > 0,
          comments: post.commentCount ?? 0
        };
      }) || [];
      const totalPages = Math.ceil(board.totalPosts / rowsPerPage);
      if (page > totalPages) {
        setPage(totalPages);
      }
      setData(data);
      setDataLoading(false);
      setCheckedRows([]);
      setCount(totalPages);
    }).catch((error) => {
      console.error('Error fetching board posts:', error);
      setData([]);
      setCount(0);
      setCheckedRows([]);
    });
  }, [id, page, activeCategory])

  const onSubmit = () => {
    if (formRef.current) {
      formRef.current.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }));
    }
  }

  const formikConfig = {
    initialValues: { searchText: '' },
    onSubmit: (values: any) => {
      console.log(values);
    }
  }

  const sections: TSection[] = [ { seq: 1, fields: [ { name: 'searchText', label: '', type: EFieldType.TextField, } ] } ];

  const isAllChecked = useMemo(
    () => data.length > 0 && checkedRows.length === data.length,
    [data, checkedRows]
  );

  const handleCheckAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCheckedRows(e.target.checked ? data.map(row => row.no) : []);
  };

  const handleCheckRow = (no: number) => {
    setCheckedRows(prev =>
      prev.includes(no) ? prev.filter(id => id !== no) : [...prev, no]
    );
  };

  return (
    <ThemeProvider theme={theme}>
      {categories.length > 0 && (
        <RowBox className='boardCategoryList'>
          <Box className={`boardCategory${activeCategory === 'All' ? ' active' : ''}`}>
            <Link className='boardCategoryLink' onClick={() => setActiveCategory('All')}>
              All
            </Link>
          </Box>
          {categories.map((category, index) => (
            <Box key={index} className={`boardCategory${activeCategory === category.id ? ' active' : ''}`}>
              <Link key={category.id} className='boardCategoryLink' onClick={() => setActiveCategory(category.id)}>
                {category.name}
              </Link>
            </Box>
          ))}
        </RowBox>
      )}
      <TableContainer component={Box}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell className="no" align='center'>No.</TableCell>
              <TableCell className="subject">Subject</TableCell>
              <TableCell className="author" align='center'>Author</TableCell>
              <TableCell className="date" align='center'>Date</TableCell>
              <TableCell className="views" align='center'>Views</TableCell>
              <TableCell className="checkbox" padding="checkbox">
                <input type="checkbox" checked={isAllChecked} onChange={handleCheckAll} />
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {dataLoading ? (
              <TableRow>
                <TableCell colSpan={6} align='center'>Loading...</TableCell>
              </TableRow>
            ) : data.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} align='center'>No posts found.</TableCell>
              </TableRow>
            ) : null}
            {data.map((row) => (
              <TableRow key={row.no}>
                <TableCell align='center'>{row.no}</TableCell>
                <TableCell>
                  <RowBox className='boardPostTitle'>
                    <Link component={NavLink} className='boardPostLink' to={`/board/detail/${row.id}?currentPage=${page}`}>
                      {row.title}
                    </Link>
                    {(row.comments??0) > 0 && (` [${row.comments}]`) }
                    {(row.hasAttachment) && (<IoIosSave size={16}/>) }
                  </RowBox>
                </TableCell>
                <TableCell align='center'>{row.author}</TableCell>
                <TableCell align='center'>{row.date}</TableCell>
                <TableCell align='center'>{row.views}</TableCell>
                <TableCell padding="checkbox">
                  <input
                    type="checkbox"
                    checked={checkedRows.includes(row.no)}
                    onChange={() => handleCheckRow(row.no)}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <RowBox className='boardFooter'>
          <RowBox className='search'>
            <FormBuilder
              variant={EVariant.SmallSize}
              showSubmitButton={false}
              formikConfig={formikConfig}
              sections={sections}
              formRef={formRef} />
            <Button size="small" startIcon={<MdSearch />} color="inherit" onClick={onSubmit}>Search</Button>
          </RowBox>
          <Pagination shape="rounded" variant="outlined" size="small" count={count} page={page} onChange={onPageChange} />
          <RowBox className='boardButtons'>
            <Button component={NavLink} to={`/board/edit/${id}`} size="small" startIcon={<FaPencil />} color="inherit">Write</Button>
            <Button component={NavLink} to={`/board/configure/${id}/info`} size="small" startIcon={<FiSettings />} color="inherit">Configure</Button>
          </RowBox>
        </RowBox>
      </TableContainer>
    </ThemeProvider>
  );
}

export default List;
