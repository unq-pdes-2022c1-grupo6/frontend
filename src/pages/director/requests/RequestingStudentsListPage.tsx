import {Page, PageContent, Spinner} from "grommet";
import {useNavigate} from "react-router-dom";
import RequestsSearchBar from "../../../components/request/RequestsSearchBar";
import {StatusRadioGroup} from "../../../components/request/FilterRadioGroup";
import {useSearch} from "../../../state/search";
import {useSearchRequestingStudentsQuery} from "../../../services/studentService";
import RequestingStudentsTable from "../../../components/student/RequestingStudentsTable";



const RequestingStudentsListPage = () => {
    const navigate = useNavigate();
    const {search, setSearch, deleteSearch} = useSearch();
    const searchRequestingStudentsQuery = useSearchRequestingStudentsQuery(search);


    return <Page kind="wide" pad="large" gap="large" align="center">
        <PageContent direction="row-responsive" gap="large">
            <RequestsSearchBar
                placeholder="Buscar por DNI..."
                inputProps={{ type: "number", min: 0 }}
                searchTerm={search.term}
                onSearch={(searchTerm) => setSearch("term", searchTerm)}
                onCancel={() => deleteSearch("term")}/>
            <StatusRadioGroup
                value={search.filter}
                onChange={(value) => setSearch("filter", value)}
                onCancel={() => deleteSearch("filter")}/>
            {searchRequestingStudentsQuery.isLoading && <Spinner size="medium"/>}
        </PageContent>
        <PageContent width="large">
            <RequestingStudentsTable
                content={searchRequestingStudentsQuery.data || []}
                onClickRow={(dni) => navigate(dni + "")}
            />
        </PageContent>
    </Page>

};

export default RequestingStudentsListPage;
