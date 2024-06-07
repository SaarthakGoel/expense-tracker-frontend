import React from 'react'

const DashHeader = () => {
  return (
    <div className=''>
      <section className='flex h-[10vh] justify-between items-center fixed top-0 right-0 left-0 bg-darkprimary'>
        <section>
          Pocket Khata
        </section>
        <section>
          <button>
            logout
          </button>
        </section>
      </section>

    </div>
  )
}

export default DashHeader