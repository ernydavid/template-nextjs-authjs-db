'use client'

import {
  Table,
  TableBody,
  TableHeader,
  TableHead,
  TableFooter,
  TableCell,
  TableRow
} from '@/components/ui/table'

import { EditCountryDialog } from './edit-country-dialog'
import { DeleteCountryDialog } from './delete-country-dialog'

export function CountriesTable ({
  countries
}:{countries: any[]}) {
  return (
    <Table className='text-sm'>
      <TableHeader>
        <TableRow>
          <TableHead>
            Country Name
          </TableHead>
          <TableHead className='hidden w-[100px] md:table-cell text-right'>
            ISO 2 Name
          </TableHead>
          <TableHead className='w-[100px] text-right'>
            ISO 3 Name
          </TableHead>
          <TableHead className='hidden xl:table-cell w-[100px] text-right'>
            Phone Code
          </TableHead>
          <TableHead className='text-center'>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {countries.map((country) => (
          <TableRow
            key={country.id}
          >
            <TableCell className='font-medium'>
              <div className='flex items-center gap-2'>
                <div className='w-5 h-5 rounded-full overflow-hidden flex justify-center items-center'>
                  <img
                    className='h-full object-cover object-center'
                    src={`https://flagcdn.com/${country.iso2Name.toLowerCase()}.svg`}
                    alt={`${country.name} flag`}
                  />
                </div>
                <span>{country.name}</span>
              </div>
            </TableCell>
            <TableCell className='hidden md:table-cell text-right w-[100px]'>{country.iso2Name}</TableCell>
            <TableCell className='text-right w-[100px]'>{country.iso3Name}</TableCell>
            <TableCell className='hidden xl:table-cell text-right w-[100px]'>{country.codePhone}</TableCell>
            <TableCell>
              <div className='flex justify-center items-center gap-2'>
                <EditCountryDialog
                  id={country.id}
                  name={country.name}
                  iso2Name={country.iso2Name}
                  iso3Name={country.iso3Name}
                  codePhone={country.codePhone}
                />
                <DeleteCountryDialog id={country.id} />
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell className='font-bold'>All Countries</TableCell>
          <TableCell />
          <TableCell className='hidden md:table-cell' />
          <TableCell className='hidden xl:table-cell' />
          <TableCell className='text-center font-bold'>{countries.length}</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  )
}
